import { Injectable, OnModuleDestroy, OnModuleInit, Logger } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ConfigService } from '@nestjs/config';

export interface Analysis {
  id: string;
  urlSite: string;
  urlHash: string;
  email: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  scorePerformance: number | null;
  scoreAccessibility: number | null;
  scoreSeo: number | null;
  scoreBestPractices: number | null;
  lcpMobile: number | null;
  clsMobile: number | null;
  tbtMobile: number | null;
  fcpMobile: number | null;
  ttfbMobile: number | null;
  lcpDesktop: number | null;
  clsDesktop: number | null;
  tbtDesktop: number | null;
  fcpDesktop: number | null;
  ttfbDesktop: number | null;
  imagesToOptimize: any;
  blockingScripts: any;
  unusedResources: any;
  reportJson: any;
  screenshotUrl: string | null;
  cloudinaryPublicId: string | null;
  whatsappLink: string | null;
  reportUrl: string | null;
  locale: string;
  source: string;
  clerkUserId: string | null;  // Clerk user ID when authenticated (NULL for anonymous audits)
  ipAddress: string | null;
  userAgent: string | null;
  deletedAt: Date | null;
  anonymizedAt: Date | null;
  errorMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
  completedAt: Date | null;
  failedAt: Date | null;
}

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool!: mysql.Pool;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit(): Promise<void> {
    const databaseUrl = this.config.get<string>('database.url', '');
    this.pool = mysql.createPool({
      uri: databaseUrl,
      ssl: { rejectUnauthorized: false },
      waitForConnections: true,
      connectionLimit: 10,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
    this.logger.log('Database connection pool initialized');
  }

  async onModuleDestroy(): Promise<void> {
    await this.pool?.end();
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.pool.query('SELECT 1');
      return true;
    } catch {
      return false;
    }
  }

  private rowToAnalysis(row: any): Analysis {
    if (!row) return null as any;
    return {
      id:                  row.id,
      urlSite:             row.url_site,
      urlHash:             row.url_hash,
      email:               row.email_client,
      status:              row.status,
      scorePerformance:    row.score_performance,
      scoreAccessibility:  row.score_accessibility,
      scoreSeo:            row.score_seo,
      scoreBestPractices:   row.score_best_practices,
      lcpMobile:           row.lcp_mobile,
      clsMobile:           row.cls_mobile,
      tbtMobile:           row.tbt_mobile,
      fcpMobile:           row.fcp_mobile,
      ttfbMobile:          row.ttfb_mobile,
      lcpDesktop:          row.lcp_desktop,
      clsDesktop:          row.cls_desktop,
      tbtDesktop:          row.tbt_desktop,
      fcpDesktop:          row.fcp_desktop,
      ttfbDesktop:         row.ttfb_desktop,
      imagesToOptimize:    this.parseJson(row.images_to_optimize),
      blockingScripts:     this.parseJson(row.blocking_scripts),
      unusedResources:     this.parseJson(row.unused_resources),
      reportJson:          this.parseJson(row.report_json),
      screenshotUrl:       row.screenshot_url,
      cloudinaryPublicId:  row.cloudinary_public_id,
      whatsappLink:        row.whatsapp_link,
      reportUrl:           row.report_url,
      locale:              row.locale,
      source:              row.source,
      clerkUserId:         row.clerk_user_id ?? null,
      ipAddress:           row.ip_address,
      userAgent:           row.user_agent,
      deletedAt:           row.deleted_at,
      anonymizedAt:        row.anonymized_at,
      errorMessage:        row.error_message,
      createdAt:           row.created_at,
      updatedAt:           row.updated_at,
      completedAt:         row.completed_at,
      failedAt:            row.failed_at,
    };
  }

  private parseJson(value: any): any {
    if (value === null || value === undefined) return null;
    if (typeof value === 'string') {
      try { return JSON.parse(value); } catch { return null; }
    }
    return value;
  }

  async createAnalysis(data: {
    urlSite: string;
    urlHash: string;
    email: string;
    locale: string;
    source: string;
    clerkUserId?: string | null;
    ipAddress: string | null;
  }): Promise<Analysis> {
    const id = this.generateId();
    await this.pool.query(
      `INSERT INTO analyses (id, url_site, url_hash, email_client, status, locale, source, clerk_user_id, ip_address, created_at, updated_at)
       VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, NOW(), NOW())`,
      [id, data.urlSite, data.urlHash, data.email, data.locale, data.source, data.clerkUserId ?? null, data.ipAddress],
    );
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM analyses WHERE id = ?',
      [id],
    );
    return this.rowToAnalysis(rows[0]);
  }

  async findAnalysisById(id: string): Promise<Analysis | null> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      'SELECT * FROM analyses WHERE id = ? AND deleted_at IS NULL',
      [id],
    );
    return rows[0] ? this.rowToAnalysis(rows[0]) : null;
  }

  async updateAnalysis(id: string, data: Record<string, any>): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    const columnMap: Record<string, string> = {
      urlSite: 'url_site', urlHash: 'url_hash', email: 'email_client', status: 'status',
      scorePerformance: 'score_performance', scoreAccessibility: 'score_accessibility',
      scoreSeo: 'score_seo', scoreBestPractices: 'score_best_practices',
      lcpMobile: 'lcp_mobile', clsMobile: 'cls_mobile', tbtMobile: 'tbt_mobile',
      fcpMobile: 'fcp_mobile', ttfbMobile: 'ttfb_mobile',
      lcpDesktop: 'lcp_desktop', clsDesktop: 'cls_desktop', tbtDesktop: 'tbt_desktop',
      fcpDesktop: 'fcp_desktop', ttfbDesktop: 'ttfb_desktop',
      imagesToOptimize: 'images_to_optimize', blockingScripts: 'blocking_scripts',
      unusedResources: 'unused_resources', reportJson: 'report_json',
      screenshotUrl: 'screenshot_url', cloudinaryPublicId: 'cloudinary_public_id',
      whatsappLink: 'whatsapp_link', reportUrl: 'report_url',
      locale: 'locale', source: 'source', clerkUserId: 'clerk_user_id', ipAddress: 'ip_address',
      userAgent: 'user_agent', deletedAt: 'deleted_at', anonymizedAt: 'anonymized_at',
      errorMessage: 'error_message',
      completedAt: 'completed_at', failedAt: 'failed_at',
    };

    for (const [key, value] of Object.entries(data)) {
      if (columnMap[key] && value !== undefined) {
        fields.push(`${columnMap[key]} = ?`);
        let dbValue: any;
        if (value instanceof Date) {
          dbValue = value.toISOString().slice(0, 19).replace('T', ' ');
        } else if (typeof value === 'object' && value !== null) {
          dbValue = JSON.stringify(value);
        } else {
          dbValue = value;
        }
        values.push(dbValue);
      }
    }

    if (fields.length === 0) return;
    fields.push('updated_at = NOW()');
    values.push(id);

    await this.pool.query(
      `UPDATE analyses SET ${fields.join(', ')} WHERE id = ?`,
      values,
    );
  }

  async findAnalysesByUser(clerkUserId: string): Promise<Analysis[]> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      `SELECT * FROM analyses WHERE clerk_user_id = ? AND deleted_at IS NULL ORDER BY created_at DESC`,
      [clerkUserId],
    );
    return rows.map((row) => this.rowToAnalysis(row));
  }

  async findCachedAnalysis(urlHash: string, cutoff: Date): Promise<Analysis | null> {
    const [rows] = await this.pool.query<mysql.RowDataPacket[]>(
      `SELECT * FROM analyses WHERE url_hash = ? AND status = 'completed' AND created_at >= ? AND deleted_at IS NULL ORDER BY created_at DESC LIMIT 1`,
      [urlHash, cutoff],
    );
    return rows[0] ? this.rowToAnalysis(rows[0]) : null;
  }

  private generateId(): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = 'c';
    for (let i = 0; i < 25; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
  }
}
