'use client';

import Link from 'next/link';
import {
  Sparkles, Lock, Download, Server, Code2, Globe2,
  Megaphone, Share2, Tag, Cookie, Wifi, LayoutGrid, Zap,
} from 'lucide-react';
import { useSubscription } from '@/context/SubscriptionContext';

// ── Catégories d'entités → icône + libellé FR ─────────────────────────────
const CATEGORY_META: Record<string, { label: string; icon: React.ReactNode }> = {
  ad:              { label: 'Publicité',       icon: <Megaphone className="w-3.5 h-3.5" /> },
  analytics:       { label: 'Analytics',       icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  social:          { label: 'Réseaux sociaux', icon: <Share2 className="w-3.5 h-3.5" /> },
  'tag-manager':   { label: 'Tag Manager',     icon: <Tag className="w-3.5 h-3.5" /> },
  cdn:             { label: 'CDN',             icon: <Wifi className="w-3.5 h-3.5" /> },
  'customer-success': { label: 'Support',      icon: <Globe2 className="w-3.5 h-3.5" /> },
  marketing:       { label: 'Marketing',       icon: <Megaphone className="w-3.5 h-3.5" /> },
  utility:         { label: 'Utilitaire',      icon: <Code2 className="w-3.5 h-3.5" /> },
};

function categoryMeta(cat?: string) {
  return CATEGORY_META[cat ?? ''] ?? { label: 'Tiers', icon: <Globe2 className="w-3.5 h-3.5" /> };
}

// ── Normalise : PageSpeed wrappe dans lighthouseResult ────────────────────
function getLighthouseData(reportJson: any): any {
  if (!reportJson || typeof reportJson !== 'object') return null;
  return reportJson.lighthouseResult ?? reportJson;
}

// ── Extraction structurée ─────────────────────────────────────────────────
interface TechSection {
  title: string;
  icon: React.ReactNode;
  items: Array<{ label: string; sub?: string; icon?: React.ReactNode }>;
}

function extractTechSections(reportJson: any): TechSection[] {
  const lh = getLighthouseData(reportJson);
  if (!lh) return [];

  const sections: TechSection[] = [];

  // ── 1. Stack Packs (CMS / framework détecté par Lighthouse) ─────────
  const stacks: string[] = (lh.stackPacks ?? [])
    .map((s: any) => s.title ?? s.id)
    .filter(Boolean);
  if (stacks.length) {
    sections.push({
      title: 'Stack détecté',
      icon: <Code2 className="w-4 h-4" />,
      items: stacks.map((s) => ({ label: s })),
    });
  }

  // ── 2. Entités tierces (depuis entities[]) ───────────────────────────
  const entities: any[] = lh.entities ?? [];
  const thirdParty = entities
    .filter((e) => !e.isFirstParty && !e.isUnrecognized && e.name)
    .slice(0, 8);

  if (thirdParty.length) {
    // Groupe par catégorie
    const byCategory: Record<string, string[]> = {};
    for (const e of thirdParty) {
      const cat = e.category ?? 'utility';
      if (!byCategory[cat]) byCategory[cat] = [];
      byCategory[cat].push(e.name);
    }
    sections.push({
      title: 'Services tiers détectés',
      icon: <Globe2 className="w-4 h-4" />,
      items: Object.entries(byCategory).map(([cat, names]) => ({
        label: names.join(', '),
        sub: categoryMeta(cat).label,
        icon: categoryMeta(cat).icon,
      })),
    });
  }

  // ── 3. Serveur — temps de réponse ────────────────────────────────────
  const srt = lh.audits?.['server-response-time'];
  if (srt != null) {
    const ms = Math.round(srt.numericValue ?? 0);
    const qual = ms < 200 ? '✓ Excellent' : ms < 600 ? '~ Correct' : '⚠ Lent';
    // Protocole réseau via network-requests[0]
    const proto: string | undefined = lh.audits?.['network-requests']?.details?.items?.[0]?.protocol;
    const protoLabel = proto
      ? proto === 'h3' ? 'HTTP/3' : proto === 'h2' ? 'HTTP/2' : proto.toUpperCase()
      : undefined;

    const items: TechSection['items'] = [
      { label: `${ms} ms`, sub: `Temps de réponse serveur — ${qual}`, icon: <Zap className="w-3.5 h-3.5" /> },
    ];
    if (protoLabel) {
      items.push({ label: protoLabel, sub: 'Protocole réseau', icon: <Wifi className="w-3.5 h-3.5" /> });
    }
    sections.push({ title: 'Serveur', icon: <Server className="w-4 h-4" />, items });
  }

  // ── 4. Cookies tiers ─────────────────────────────────────────────────
  const cookieAudit = lh.audits?.['third-party-cookies'];
  if (cookieAudit?.details?.items?.length) {
    const count = cookieAudit.details.items.length;
    sections.push({
      title: 'Cookies tiers',
      icon: <Cookie className="w-4 h-4" />,
      items: [
        {
          label: `${count} cookie${count > 1 ? 's' : ''} tiers détecté${count > 1 ? 's' : ''}`,
          sub: cookieAudit.details.items.slice(0, 3).map((c: any) => c.name).join(', '),
          icon: <Cookie className="w-3.5 h-3.5" />,
        },
      ],
    });
  }

  return sections;
}

// ── Composant principal ────────────────────────────────────────────────────
export default function ReportProFeatures({ reportJson, analysisId }: {
  reportJson: any;
  analysisId: string;
}) {
  const { isActive, plan } = useSubscription();

  // ── Bannière gratuit ────────────────────────────────────────────────────
  if (!isActive) {
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
            Détection des technologies, services tiers, export PDF, historique illimité.
          </p>
        </div>
        <Link href="/tarifs" className="velifa-btn flex-shrink-0 flex items-center gap-2 text-sm">
          <Sparkles className="w-4 h-4" />
          Voir les plans
        </Link>
      </div>
    );
  }

  // ── Sections Pro ────────────────────────────────────────────────────────
  const techSections = extractTechSections(reportJson);
  const planLabel = plan === 'business' ? 'Business' : 'Pro';

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
          Rapport {planLabel}
        </span>
        <span className="text-text-subtle text-xs">Analyse avancée activée</span>
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
          <Code2 className="w-4 h-4" style={{ color: 'var(--accent)' }} strokeWidth={1.75} />
          <h2 className="font-heading font-semibold text-text text-base">Détection des technologies</h2>
        </div>

        {techSections.length === 0 ? (
          <p className="text-text-muted text-sm py-4 text-center">
            Aucune technologie détectée automatiquement pour ce site.
          </p>
        ) : (
          <div className="space-y-5">
            {techSections.map((section) => (
              <div key={section.title}>
                {/* Titre de section */}
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-text-subtle">{section.icon}</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-text-subtle">
                    {section.title}
                  </span>
                </div>
                {/* Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 px-3 py-2.5 rounded-[var(--velifa-radius-md)]"
                      style={{ background: 'var(--surface-raised)' }}
                    >
                      {item.icon && (
                        <span className="text-text-subtle mt-0.5 flex-shrink-0">{item.icon}</span>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-text truncate">{item.label}</p>
                        {item.sub && (
                          <p className="text-xs text-text-muted mt-0.5 truncate">{item.sub}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
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
          Bientôt
        </button>
      </div>

    </div>
  );
}
