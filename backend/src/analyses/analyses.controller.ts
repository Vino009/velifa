import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Sse,
  MessageEvent,
  UseGuards,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { Observable, map } from 'rxjs';
import { AnalysesService } from './analyses.service';
import { SseService } from '../sse/sse.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { ClientIp } from '../common/decorators/client-ip.decorator';

@Controller('analyses')
@UseGuards(ThrottlerGuard)
export class AnalysesController {
  private readonly logger = new Logger(AnalysesController.name);

  constructor(
    private readonly analysesService: AnalysesService,
    private readonly sseService: SseService,
  ) {}

  /**
   * POST /analyses
   * Creates a new analysis and queues it for processing.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateAnalysisDto,
    @ClientIp() ip: string,
  ) {
    const analysis = await this.analysesService.create(dto, ip);
    return {
      id:     analysis.id,
      status: analysis.status,
      cached: analysis.status === 'completed',
    };
  }

  /**
   * GET /analyses/:id
   * Returns the current state of an analysis.
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.analysesService.findById(id);
  }

  /**
   * GET /analyses/:id/stream
   * Server-Sent Events endpoint — real-time status updates.
   */
  @Sse(':id/stream')
  stream(@Param('id') id: string): Observable<MessageEvent> {
    this.logger.debug(`SSE stream opened for ${id}`);
    return this.sseService.getStream(id).pipe(
      map((event) => ({
        data: JSON.stringify(event),
        id:   event.analysisId,
        type: 'analysis-update',
      })),
    );
  }
}
