import Link from 'next/link';
import { Zap, Globe, Search, Gauge, ArrowRight, Sparkles, Eye, Target } from 'lucide-react';

const whyPoints = [
  {
    icon: Globe,
    title: 'Un site lent fait fuir les visiteurs',
    description: 'Quelques secondes de chargement en plus suffisent à perdre une part importante de vos visiteurs. La performance est un facteur clé de la rétention.',
  },
  {
    icon: Search,
    title: 'La vitesse influence le référencement',
    description: 'Google intègre la performance des pages dans ses critères de classement. Un site rapide a un avantage significatif en termes de visibilité.',
  },
  {
    icon: Gauge,
    title: 'Les Core Web Vitals sont des critères officiels',
    description: 'Google utilise LCP, CLS et TBT pour évaluer l\'expérience utilisateur. Ces métriques jouent un rôle direct dans le classement de vos pages.',
  },
];

const values = [
  {
    icon: Sparkles,
    title: 'Simplicité',
    description: 'Pas besoin d\'être expert pour comprendre ses scores. Velifa traduit les données techniques en informations claires et actionnables.',
  },
  {
    icon: Eye,
    title: 'Transparence',
    description: 'Les audits sont réalisés via Google PageSpeed Insights — un outil reconnu. Les résultats sont reproductibles et vérifiables.',
  },
  {
    icon: Target,
    title: 'Résultats concrets',
    description: 'Chaque recommandation est actionable. Velifa vous aide à passer de l\'analyse à l\'amélioration réelle de vos performances.',
  },
];

export default function AProposPage() {
  return (
    <main className="min-h-screen bg-bg">
     
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <p className="velifa-eyebrow mb-5">À propos</p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
          La performance web<br className="hidden md:block" />
          à la portée de tous
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Velifa rend l&apos;audit de performance accessible, clair et actionnable. Nous croyons que chaque site mérite d&apos;être rapide.
        </p>
      </section>

      {/* ── Notre mission ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="velifa-card py-10 px-8 md:py-14 md:px-16 text-center">
          <p className="velifa-eyebrow mb-6">Notre mission</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text mb-6">
            Rendre le web plus rapide, ensemble
          </h2>
          <p className="text-text-muted leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            La performance d&apos;un site web ne devrait pas être un domaine réservé aux experts techniques. Pourtant, elle conditionne l&apos;expérience de chaque visiteur et le succès de chaque projet en ligne. Velifa existe pour changer cela — en offrant un outil d&apos;audit simple, transparent et vraiment utile, accessible à tous ceux qui veulent créer des sites plus rapides.
          </p>
        </div>
      </section>

      {/* ── Pourquoi la performance compte ────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <p className="velifa-eyebrow mb-4">Pourquoi la performance compte</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
            La vitesse est un atout stratégique
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whyPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="velifa-card">
                <div className="w-12 h-12 rounded-velifa-md flex items-center justify-center mb-5"
                  style={{ background: 'var(--accent-soft)' }}>
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-text mb-3">{point.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{point.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Nos valeurs ───────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <p className="velifa-eyebrow mb-4">Notre approche</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
            Ce qui guide Velifa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="velifa-card text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'var(--accent-soft)', border: '2px solid var(--accent)' }}>
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-text mb-3">{value.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="velifa-card text-center py-12 px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text mb-4">
            Prêt à améliorer votre site ?
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Lancez votre premier audit gratuit en quelques secondes. Aucun compte requis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="velifa-btn">
              Lancer un audit gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/tarifs" className="velifa-btn velifa-btn--ghost">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer note ───────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <p className="text-text-subtle text-xs">
          Velifa utilise Google PageSpeed Insights pour les audits. Les scores reflètent la méthodologie Lighthouse.
        </p>
      </div>
    </main>
  );
}