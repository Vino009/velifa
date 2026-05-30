import type { Analysis, CreateAnalysisResponse } from '@/types/analysis';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message ?? `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  createAnalysis: (body: {
    url: string; email: string; cfTurnstileToken: string; locale?: string;
  }) => apiFetch<CreateAnalysisResponse>('/analyses', { method: 'POST', body: JSON.stringify(body) }),

  getAnalysis: (id: string) => apiFetch<{ data: Analysis }>(`/analyses/${id}`),
};
