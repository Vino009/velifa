import type { Analysis, CreateAnalysisResponse, MyAudit } from '@/types/analysis';
import type { SubscriptionInfo } from '@/types/subscription';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

interface ApiFetchOptions extends RequestInit {
  authToken?: string | null;
}

async function apiFetch<T>(path: string, options?: ApiFetchOptions): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (options?.authToken) {
    headers['Authorization'] = `Bearer ${options.authToken}`;
  }
  const { authToken, ...rest } = options ?? {};
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { ...headers, ...rest?.headers },
    ...rest,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const apiErr = new Error((body as any).message ?? `API error ${res.status}`) as Error & { statusCode: number };
    apiErr.statusCode = res.status;
    throw apiErr;
  }
  return res.json() as Promise<T>;
}

export const api = {
  createAnalysis: (body: {
    url: string; email: string; cfTurnstileToken: string; locale?: string; force?: boolean;
  }, authToken?: string | null) =>
    apiFetch<CreateAnalysisResponse>('/analyses', {
      method: 'POST',
      body: JSON.stringify(body),
      authToken,
    }),

  getAnalysis: (id: string) => apiFetch<{ data: Analysis }>(`/analyses/${id}`),

  getMine: (authToken: string) =>
    apiFetch<{ data: MyAudit[]; timestamp: string }>('/analyses/mine', { authToken }),

  createCheckout: (body: { plan: 'pro' | 'business'; email?: string }, authToken: string) =>
    apiFetch<{ data: { checkoutUrl: string } }>('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify(body),
      authToken,
    }),

  getMyPlan: (authToken: string) =>
    apiFetch<{ data: SubscriptionInfo }>('/payments/me', { authToken }),
};
