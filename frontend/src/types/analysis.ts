export type AnalysisStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface AuditItem {
  url?: string;
  title: string;
  description?: string;
  savingsBytes?: number;
  savingsMs?: number;
}

export interface Analysis {
  id: string;
  urlSite: string;
  email: string;
  status: AnalysisStatus;
  scorePerformance?: number | null;
  scoreAccessibility?: number | null;
  scoreSeo?: number | null;
  scoreBestPractices?: number | null;
  lcpMobile?: number | null;
  clsMobile?: number | null;
  tbtMobile?: number | null;
  fcpMobile?: number | null;
  ttfbMobile?: number | null;
  lcpDesktop?: number | null;
  clsDesktop?: number | null;
  tbtDesktop?: number | null;
  screenshotUrl?: string | null;
  whatsappLink?: string | null;
  reportUrl?: string | null;
  imagesToOptimize?: AuditItem[] | null;
  blockingScripts?: AuditItem[] | null;
  unusedResources?: AuditItem[] | null;
  errorMessage?: string | null;
  createdAt: string;
  completedAt?: string | null;
}

export interface CreateAnalysisResponse {
  data: { id: string; status: AnalysisStatus; cached: boolean };
  timestamp: string;
}

export interface MyAudit {
  id: string;
  url: string;
  status: AnalysisStatus;
  scorePerformance: number | null;
  scoreAccessibility: number | null;
  scoreSeo: number | null;
  scoreBestPractices: number | null;
  createdAt: string;
  completedAt: string | null;
}

export interface SseEvent {
  status: AnalysisStatus;
  analysisId: string;
  redirectUrl?: string;
}
