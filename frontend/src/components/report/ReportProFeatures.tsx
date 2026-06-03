'use client';

import Link from 'next/link';
import { Sparkles, Lock, Download, Server, Code2, Globe2 } from 'lucide-react';
import { useSubscription } from '@/context/SubscriptionContext';

// ── Extraction technologies depuis report_json Lighthouse ─────────────────
function extractTech(reportJson: any): Array<{ label: string; value: string; icon: React.ReactNode }> {
  if (!reportJson || typeof reportJson !== 'object') return [];
  const items: Array<{ label: string; value: string; icon: React.ReactNode }> = [];

  // Stack packs détectés par Lighthouse
  const stacks: string[] = (reportJson.stackPacks ?? []).map((s: any) => s.title ?? s.id).filter(Boolean);
  if (stacks.length) {
    items.push({ label: 'Stack détecté', value: stacks.join(', '), icon: <Code2 className="w-4 h-4" /> });
  }

  // Server-response-time → headers
  const srt = reportJson.audits?.['server-response-time'];
  const serverHeader = srt?.details?.headings?.find((h: any) => h.label?.toLowerCase().includes('server'));
  const serverValue = srt?.details?.items?.[0]?.['responseTime']
    ? `${Math.round(srt.details.items[0].responseTime)} ms`
    : null;
  if (serverValue) {
    items.push({ label: 'Temps de réponse serveur', value: serverValue, icon: <Server className="w-4 h-4" /> });
  }

  // Entités tiers
  const entities: string[] = (reportJson.entities ?? [])
    .filter((e: any) => !e.isFirstParty)
    .slice(0, 4)
    .map((e: any) => e.name)
    .filter(Boolean);
  if (entities.length) {
    items.push({ label: 'Services tiers détectés', value: entities.join(', '), icon: <Globe2 className="w-4 h-4" /> });
  }

  // Fallback si rien trouvé
  if (items.length === 0) {
    items.push({ label: 'Analyse', value: 'Données Lighthouse disponibles', icon: <Code2 className="w-4 h-4" /> });
  }

  return items;
}

// ── Composant principal ────────────────────────────────────────────────────
export default function ReportProFeatures({ reportJson, analysisId }: {
  reportJson: any;
  analysisId: string;
}) {
  const { isActive, plan } = useSubscription();

  if (!isActive) {
    // ── Bannière gratuit ──────────────────────────────────────────────
    return (
      <div
        className="rounded-[var(--velifa-radius-lg)] border p-6 flex flex-col sm:flex-row sm:items-center gap-5"
        style={{
          background: 'linear-gradient(135deg, rgba(18,18,18,0.98) 0%, rgba(30,24,10,0.98) 100%)',
          border: '1px solid rgba(212,175,55,0.25)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
        }}
      >
        <div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}
        >
          <Lock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
        </div>
        <div className="flex-1">
          <p className="font-heading font-semibold text-base" style={{ color: 'var(--accent)' }}>
            Débloquez le rapport complet avec Velifa Pro
          </p>
          <p className="text-text-muted text-sm mt-1 leading-relaxed">
            Détection des technologies, export PDF, analyse des ressources tiers et historique illimité.
          </p>
        </div>
        <Link href="/tarifs" className="velifa-btn flex-shrink-0 flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4" />
          Voir les plans
        </Link>
      </div>
    );
  }

  // ── Section Pro ───────────────────────────────────────────────────────
  const techItems = extractTech(reportJson);

  return (
    <div className="space-y-4">
      {/* Badge rapport Pro */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.18) 0%, rgba(168,123,30,0.25) 100%)',
            border: '1px solid rgba(212,175,55,0.45)',
            color: 'var(--accent)',
            boxShadow: '0 2px 12px rgba(212,175,55,0.15)',
          }}
        >
          <Sparkles className="w-3 h-3" />
          Rapport {plan === 'business' ? 'Business' : 'Pro'}
        </span>
        <span className="text-text-subtle text-xs">Fonctionnalités exclusives activées</span>
      </div>

      {/* Détection des technologies */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(36,36,36,0.9) 0%, rgba(18,18,18,0.95) 100%)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--velifa-radius-lg)',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.45)',
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Code2 className="w-4 h-4 text-accent" strokeWidth={1.75} />
          <h2 className="font-heading font-semibold text-text text-base">Détection des technologies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {techItems.map(({ label, value, icon }, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-[var(--velifa-radius-md)]"
              style={{ background: 'var(--surface-raised)' }}
            >
              <span className="text-text-subtle mt-0.5 flex-shrink-0">{icon}</span>
              <div>
                <p className="text-[11px] font-semibold tracking-wide uppercase text-text-subtle mb-0.5">{label}</p>
                <p className="text-sm text-text font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export PDF (placeholder) */}
      <div
        className="flex items-center justify-between gap-4 p-4 rounded-[var(--velifa-radius-lg)]"
        style={{
          background: 'rgba(212,175,55,0.05)',
          border: '1px dashed rgba(212,175,55,0.30)',
        }}
      >
        <div className="flex items-center gap-3">
          <Download className="w-4 h-4 text-accent" strokeWidth={1.75} />
          <div>
            <p className="text-sm font-medium text-text">Exporter en PDF</p>
            <p className="text-xs text-text-muted">Rapport complet prêt à partager</p>
          </div>
        </div>
        <button
          disabled
          className="velifa-btn text-xs opacity-60 cursor-not-allowed flex items-center gap-2"
          title="Disponible prochainement"
        >
          <Download className="w-3.5 h-3.5" />
          Exporter (bientôt)
        </button>
      </div>
    </div>
  );
}
