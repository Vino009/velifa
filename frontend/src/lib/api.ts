import type { Analysis, CreateAnalysisResponse } from '@/types/analysis';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

interface ApiFetchOptions extends RequestInit {
  authToken?: string;
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
    const err = await res.json().catch(() => ({}));
    throw new Error((err as any).message ?? `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  createAnalysis: (body: {
    url: string; email: string; cfTurnstileToken: string; locale?: string; force?: boolean;
  }, authToken?: string) =>
    apiFetch<CreateAnalysisResponse>('/analyses', {
      method: 'POST',
      body: JSON.stringify(body),
      authToken,
    }),

  getAnalysis: (id: string) => apiFetch<{ data: Analysis }>(`/analyses/${id}`),
};
