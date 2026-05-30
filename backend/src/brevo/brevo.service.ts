import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface SendReportEmailDto {
  toEmail: string;
  urlSite: string;
  scorePerformance: number;
  lcp: number | null;
  cls: number | null;
  tbt: number | null;
  reportUrl: string;
  whatsappUrl: string;
  screenshotUrl?: string | null;
}

@Injectable()
export class BrevoService {
  private readonly logger = new Logger(BrevoService.name);
  private readonly apiKey: string;
  private readonly templateId: number;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey     = this.config.get<string>('brevo.apiKey', '');
    this.templateId = this.config.get<number>('brevo.templateId', 1);
    this.fromEmail  = this.config.get<string>('brevo.fromEmail', '');
    this.fromName   = this.config.get<string>('brevo.fromName', 'VELIFA');
  }

  async sendReportEmail(dto: SendReportEmailDto): Promise<void> {
    if (!this.apiKey) {
      this.logger.warn('BREVO_API_KEY not set — skipping email');
      return;
    }

    const scoreLabel = this.getScoreLabel(dto.scorePerformance);
    const scoreColor = this.getScoreColor(dto.scorePerformance);

    try {
      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender:  { email: this.fromEmail, name: this.fromName },
          to:      [{ email: dto.toEmail }],
          templateId: this.templateId,
          params: {
            url_site:       dto.urlSite,
            score_global:   dto.scorePerformance,
            score_label:    scoreLabel,
            score_color:    scoreColor,
            lcp:            dto.lcp != null ? `${(dto.lcp / 1000).toFixed(1)}s` : 'N/A',
            cls:            dto.cls != null ? dto.cls.toFixed(3) : 'N/A',
            tbt:            dto.tbt != null ? `${Math.round(dto.tbt)}ms` : 'N/A',
            rapport_url:    dto.reportUrl,
            whatsapp_url:   dto.whatsappUrl,
            screenshot_url: dto.screenshotUrl ?? '',
          },
        },
        {
          headers: {
            'api-key':      this.apiKey,
            'Content-Type': 'application/json',
          },
          timeout: 10_000,
        },
      );
      this.logger.log(`Email sent to ${dto.toEmail}`);
    } catch (error: any) {
      const msg = error.response?.data?.message ?? error.message;
      this.logger.warn(`Email failed (non-blocking): ${msg}`);
      throw error; // Let caller handle non-blocking
    }
  }

  private getScoreLabel(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 50) return 'À améliorer';
    return 'Critique';
  }

  private getScoreColor(score: number): string {
    if (score >= 90) return 'green';
    if (score >= 50) return 'orange';
    return 'red';
  }
}
