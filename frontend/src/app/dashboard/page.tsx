'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Loader2, Globe, ArrowRight, BarChart2, FileSearch, Zap } from 'lucide-react';
import { api } from '@/lib/api';
import { getScoreColor, getScoreLabel } from '@/lib/utils';
import type { MyAudit } from '@/types/analysis';

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

function stripUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.host + (u.pathname !== '/' ? u.pathname : '');
  } catch {
    return url;
  }
}

function AuditCard({ audit }: { audit: MyAudit }) {
  const score = audit.scorePerformance;
  const isReady = audit.status === 'completed';
  return (
    <div className="velifa-card flex flex-col sm:flex-row sm:items-center gap-5">
      {/* Score circle */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full font-heading font-bold text-2xl"
        style={{
          background: 'var(--velifa-score-good-bg)',
          color: isReady ? `var(--velifa-score-${score != null && score >= 90 ? 'good' : score != null && score >= 50 ? 'average' : 'poor'})` : 'var(--text-subtle)',
          border: '1px solid var(--border)',
        }}
      >
        {isReady ? (score ?? '—') : <Loader2 className="w-6 h-6 animate-spin" />}
      </div>

      {/* Infos */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-4 h-4 text-text-subtle flex-shrink-0" />
          <span className="font-medium text-text truncate">{stripUrl(audit.url)}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-muted">
          <span>
            {audit.status === 'completed' && `Score : ${getScoreLabel(score)}`}
            {audit.status === 'pending'    && 'En attente…'}
            {audit.status === 'processing' && 'Analyse en cours…'}
            {audit.status === 'failed'     && 'Échec de l\'analyse'}
          </span>
          <span>·</span>
          <span>{formatDate(audit.createdAt)}</span>
          {isReady && score != null && (
            <>
              <span>·</span>
              <span className={getScoreColor(score)}>{score}/100</span>
            </>
          )}
        </div>
      </div>

      {/* CTA */}
      {isReady ? (
        <Link
          href={`/analyse/${audit.id}`}
          className="velifa-btn flex items-center justify-center gap-2 sm:self-center"
        >
          <FileSearch className="w-4 h-4" />
          Voir le rapport
          <ArrowRight className="w-4 h-4" />
        </Link>
      ) : (
        <Link
          href={`/analyse/loading-page?id=${audit.id}`}
          className="velifa-btn velifa-btn--ghost flex items-center justify-center gap-2 sm:self-center"
        >
          <Loader2 className="w-4 h-4" />
          Suivre l&apos;analyse
        </Link>
      )}
    </div>
  );
}

function AuditCardSkeleton() {
  return (
    <div className="velifa-card flex flex-col sm:flex-row sm:items-center gap-5 animate-pulse">
      <div className="w-20 h-20 rounded-full" style={{ background: 'var(--surface-raised)' }} />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 rounded" style={{ background: 'var(--surface-raised)' }} />
        <div className="h-3 w-1/3 rounded" style={{ background: 'var(--surface-raised)' }} />
      </div>
      <div className="h-10 w-40 rounded-velifa-md" style={{ background: 'var(--surface-raised)' }} />
    </div>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const [audits, setAudits] = useState<MyAudit[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Redirect si non connecté ──────────────────────────────────────────
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // ── Fetch des audits ─────────────────────────────────────────────────
  useEffect(() => {
    if (!isSignedIn) return;
    let cancelled = false;
    (async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error('Token Clerk introuvable');
        const res = await api.getMine(token);
        // TransformInterceptor global : { data: MyAudit[], timestamp }
        if (!cancelled) setAudits(res.data);
      } catch (err: any) {
        if (!cancelled) setError(err.message ?? 'Erreur de chargement');
      }
    })();
    return () => { cancelled = true; };
  }, [isSignedIn, getToken]);

  if (!isLoaded || (isLoaded && !isSignedIn)) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </main>
    );
  }

  const isLoading = audits === null && error === null;

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ── En-tête ──────────────────────────────────────────────────── */}
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
          
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-text">Mon espace</h1>
            <p className="text-text-muted mt-2 text-sm">
              Tous vos audits, leur score et leur rapport — au même endroit.
            </p>
          </div>
          <Link
            href="/"
            className="velifa-btn flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" />
            Lancer un nouvel audit
          </Link>
        </div>

        {/* ── Contenu ──────────────────────────────────────────────────── */}
        {error && (
          <div className="velifa-card text-center py-8">
            <p className="text-score-poor font-medium">Impossible de charger vos audits</p>
            <p className="text-text-muted text-sm mt-1">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="space-y-4">
            <AuditCardSkeleton />
            <AuditCardSkeleton />
            <AuditCardSkeleton />
          </div>
        )}

        {!isLoading && !error && audits && audits.length === 0 && (
          <div className="velifa-card text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ background: 'var(--surface-raised)' }}>
              <FileSearch className="w-8 h-8 text-text-subtle" />
            </div>
            <h2 className="font-heading font-semibold text-text text-lg mb-2">Aucun audit</h2>
            <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
              Vous n&apos;avez pas encore lancé d&apos;audit. Analysez votre premier site en 30 secondes.
            </p>
            <Link href="/" className="velifa-btn inline-flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Lancer mon premier audit
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {!isLoading && !error && audits && audits.length > 0 && (
          <>
            <p className="text-text-muted text-xs uppercase tracking-widest mb-3">
              {audits.length} audit{audits.length > 1 ? 's' : ''}
            </p>
            <div className="space-y-4">
              {audits.map((a) => <AuditCard key={a.id} audit={a} />)}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
