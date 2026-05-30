import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { getScoreColor, getScoreBg, getScoreLabel, formatMs, getCwvStatus, formatBytes } from '@/lib/utils';
import { ExternalLink, MessageCircle, Globe, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export const revalidate = 0;

async function getAnalysis(id: string) {
  try {
    const res = await api.getAnalysis(id);
    return res.data;
  } catch {
    return null;
  }
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  const analysis = await getAnalysis(params.id);
  if (!analysis || analysis.status !== 'completed') notFound();

  const score = analysis.scorePerformance ?? 0;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (score / 100) * circumference;

  const cwvItems = [
    { key: 'lcp', label: 'LCP', value: analysis.lcpMobile, format: formatMs, desc: 'Largest Contentful Paint' },
    { key: 'cls', label: 'CLS', value: analysis.clsMobile, format: (v: number | null | undefined) => v != null ? v.toFixed(3) : 'N/A', desc: 'Cumulative Layout Shift' },
    { key: 'tbt', label: 'TBT', value: analysis.tbtMobile, format: formatMs, desc: 'Total Blocking Time' },
    { key: 'fcp', label: 'FCP', value: analysis.fcpMobile, format: formatMs, desc: 'First Contentful Paint' },
  ] as const;

  const lighthouseScores = [
    { label: 'Performance',     score: analysis.scorePerformance },
    { label: 'Accessibilité',   score: analysis.scoreAccessibility },
    { label: 'SEO',             score: analysis.scoreSeo },
    { label: 'Best Practices',  score: analysis.scoreBestPractices },
  ];

  function StatusIcon({ status }: { status: 'good' | 'needs-improvement' | 'poor' }) {
    if (status === 'good')             return <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />;
    if (status === 'needs-improvement') return <AlertCircle  className="w-4 h-4 text-orange-500 flex-shrink-0" />;
    return <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 truncate max-w-xs">{analysis.urlSite}</span>
            <span className="text-xs text-gray-400">
              {new Date(analysis.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <a href={analysis.urlSite} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition">
            Voir le site <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* ── Hero section ────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Score ring */}
            <div className="flex-shrink-0">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                <circle cx="60" cy="60" r="45" fill="none"
                  stroke={score >= 90 ? '#16a34a' : score >= 50 ? '#f97316' : '#dc2626'}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  className="score-ring"
                />
                <text x="60" y="55" textAnchor="middle" dominantBaseline="middle"
                  className="font-bold" style={{ fontSize: 26, fontWeight: 700, fill: '#111827' }}>
                  {score}
                </text>
                <text x="60" y="74" textAnchor="middle" style={{ fontSize: 10, fill: '#9ca3af' }}>
                  /100
                </text>
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{getScoreLabel(score)}</h1>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${getScoreBg(score)} ${getScoreColor(score)}`}>
                  Performance mobile
                </span>
              </div>
              <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                Votre site obtient un score de <strong>{score}/100</strong> sur mobile selon Google Lighthouse.
                {score < 50 && ' Des améliorations urgentes sont nécessaires.'}
                {score >= 50 && score < 90 && ' Plusieurs optimisations peuvent améliorer votre expérience utilisateur.'}
                {score >= 90 && ' Excellent travail ! Votre site est très performant.'}
              </p>
              {analysis.whatsappLink && (
                <a href={analysis.whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition">
                  <MessageCircle className="w-4 h-4" />
                  Obtenir de l&apos;aide via WhatsApp
                </a>
              )}
            </div>
            {/* Screenshot */}
            {analysis.screenshotUrl && (
              <div className="flex-shrink-0">
                <img src={analysis.screenshotUrl} alt="Capture du site"
                  className="w-48 h-32 object-cover rounded-xl border border-gray-200 shadow-sm" />
              </div>
            )}
          </div>
        </div>

        {/* ── Core Web Vitals ─────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Core Web Vitals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cwvItems.map(({ key, label, value, format, desc }) => {
              const status = getCwvStatus(key as any, value);
              const colors = {
                good: 'border-green-100 bg-green-50',
                'needs-improvement': 'border-orange-100 bg-orange-50',
                poor: 'border-red-100 bg-red-50',
              };
              const textColors = {
                good: 'text-green-700',
                'needs-improvement': 'text-orange-700',
                poor: 'text-red-700',
              };
              return (
                <div key={key} className={`rounded-xl border p-4 ${colors[status]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</span>
                    <StatusIcon status={status} />
                  </div>
                  <div className={`text-2xl font-bold ${textColors[status]}`}>
                    {format(value as any)}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Lighthouse scores ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Scores Lighthouse</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lighthouseScores.map(({ label, score: s }) => (
              <div key={label} className="text-center p-4 rounded-xl bg-gray-50">
                <div className={`text-3xl font-bold mb-1 ${getScoreColor(s)}`}>{s ?? '—'}</div>
                <div className="text-xs text-gray-500 font-medium">{label}</div>
                <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${
                    (s ?? 0) >= 90 ? 'bg-green-500' : (s ?? 0) >= 50 ? 'bg-orange-500' : 'bg-red-500'
                  }`} style={{ width: `${s ?? 0}%`, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Opportunities ────────────────────────────────────────────── */}
        {((analysis.imagesToOptimize?.length ?? 0) > 0 || (analysis.blockingScripts?.length ?? 0) > 0) && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-5">Opportunités d&apos;amélioration</h2>
            <div className="space-y-3">
              {(analysis.imagesToOptimize ?? []).slice(0, 5).map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 truncate max-w-sm">{item.url ?? item.title}</div>
                    {item.savingsBytes && (
                      <div className="text-xs text-orange-600 mt-0.5">Économie potentielle : {formatBytes(item.savingsBytes)}</div>
                    )}
                  </div>
                </div>
              ))}
              {(analysis.blockingScripts ?? []).slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900 truncate max-w-sm">{item.url ?? item.title}</div>
                    {item.savingsMs && (
                      <div className="text-xs text-red-600 mt-0.5">Ralentissement : {formatMs(item.savingsMs)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Sticky WhatsApp CTA ──────────────────────────────────────── */}
      {analysis.whatsappLink && (
        <div className="fixed bottom-6 right-6 z-50">
          <a href={analysis.whatsappLink} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all text-sm">
            <MessageCircle className="w-5 h-5" />
            Améliorer mon score
          </a>
        </div>
      )}
    </main>
  );
}
