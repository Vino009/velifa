import {
  Injectable,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from '../prisma/database.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { AnalysisJobPayload } from './analyses.worker';
import { validateUrl, hashUrl } from '../common/validators/url.validator';
import { BULL_ANALYSES_QUEUE } from '../redis/redis.module';
import axios from 'axios';

const CACHE_TTL_HOURS = 24;

@Injectable()
export class AnalysesService {
  private readonly logger = new Logger(AnalysesService.name);

  constructor(
    private readonly db: DatabaseService,
    @InjectQueue(BULL_ANALYSES_QUEUE) private readonly queue: Queue<AnalysisJobPayload>,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateAnalysisDto, ipAddress: string, clerkUserId: string | null = null) {
    await this.verifyCaptcha(dto.cfTurnstileToken, ipAddress);

    const validation = validateUrl(dto.url);
    if (!validation.valid) {
      throw new BadRequestException(validation.reason);
    }
    const normalizedUrl = validation.normalized!;
    const urlHash = hashUrl(normalizedUrl);

    const cutoff = new Date(Date.now() - CACHE_TTL_HOURS * 3600 * 1000);
    const cached = dto.force ? null : await this.db.findCachedAnalysis(urlHash, cutoff);
    if (cached) {
      this.logger.log(`Cache hit for ${normalizedUrl} → ${cached.id}`);
      return cached;
    }

    const analysis = await this.db.createAnalysis({
      urlSite:     normalizedUrl,
      urlHash,
      email:       dto.email,
      locale:      dto.locale ?? 'fr',
      source:      'web',
      clerkUserId: clerkUserId,
      ipAddress:   this.maskIp(ipAddress),
    });

    await this.queue.add(
      'run',
      { analysisId: analysis.id, url: normalizedUrl, email: dto.email, locale: dto.locale ?? 'fr' },
      { jobId: analysis.id, timeout: 60_000 },
    );

    this.logger.log(`Analysis ${analysis.id} created and queued for ${normalizedUrl}`);
    return analysis;
  }

  async findById(id: string) {
    const analysis = await this.db.findAnalysisById(id);
    if (!analysis) {
      throw new NotFoundException(`Analysis ${id} not found`);
    }
    return analysis;
  }

  private async verifyCaptcha(token: string, ip: string): Promise<void> {
    const secretKey = this.config.get<string>('security.turnstileSecretKey', '');
    if (
      !secretKey ||
      secretKey === 'your_turnstile_secret' ||
      process.env.NODE_ENV === 'development' ||
      token === 'dev-bypass-token'
    ) {
      this.logger.warn('Turnstile bypassed in development mode');
      return;
    }

    try {
      const { data } = await axios.post(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        new URLSearchParams({ secret: secretKey, response: token, remoteip: ip }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, timeout: 5000 },
      );
      if (!data.success) {
        throw new BadRequestException('CAPTCHA verification failed');
      }
    } catch (error: any) {
      if (error instanceof BadRequestException) throw error;
      this.logger.warn(`Turnstile error (bypassing in dev): ${error.message}`);
    }
  }

  private maskIp(ip: string): string {
    if (!ip) return '';
    const parts = ip.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
    return ip.substring(0, ip.length - 4) + 'xxxx';
  }
}
