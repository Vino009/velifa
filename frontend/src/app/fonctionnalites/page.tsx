import Link from 'next/link';
import {
  Zap, BarChart2, Gauge, Camera, Mail,
  Clock, Calendar, Users, FileText, Code2,
  ArrowRight, CheckCircle2,
} from 'lucide-react';

const features = [
  {
    icon: BarChart2,
    title: 'Audit de performance complet',
    description: '4 scores clés — Performance, Accessibilité, SEO, Bonnes pratiques — calculés par Velifa.',
    plan: null,
  },
  {
    icon: Gauge,
    title: 'Core Web Vitals',
    description: 'LCP, CLS, TBT, FCP mesurés et expliqués avec code couleur (bon/moyen/faible).',
    plan: null,
  },
  {
    icon: Camera,
    title: 'Capture d\'écran',
    description: 'Aperçu visuel de la page analysée pour mieux comprendre les résultats.',
    plan: null,
  },
  {
    icon: Mail,
    title: 'Rapport par email',
    description: 'Résultats détaillés envoyés directement dans votre boîte mail après chaque audit.',
    plan: null,
  },
  {
    icon: Clock,
    title: 'Suivi dans le temps',
    description: 'Historique de tous vos audits et évolution des scores pour mesurer vos progrès.',
    plan: 'Pro',
  },
  {
    icon: Calendar,
    title: 'Audits programmés',
    description: 'Analyses automatiques récurrentes pour suivre vos performances en continu.',
    plan: 'Business',
  },
  {
    icon: Users,
    title: 'Multi-sites',
    description: 'Gérez plusieurs projets et sites web depuis un seul tableau de bord.',
    plan: 'Business',
  },
  {
    icon: FileText,
    title: 'Export PDF',
    description: 'Générez des rapports PDF完整 pour partager vos résultats avec vos équipes ou clients.',
    plan: 'Business',
  },
  {
    icon: Code2,
    title: 'Accès API',
    description: 'Intégrez Velifa dans vos workflows avec un accès API complet et documentation.',
    plan: 'Business',
  },
];

const steps = [
  {
    number: '01',
    title: 'Entrez l\'URL',
    description: 'Saisissez l\'adresse du site que vous souhaitez analyser. Aucune inscription requise pour le plan gratuit.',
  },
  {
    number: '02',
    title: 'Velifa analyse',
    description: 'En quelques secondes, Velifa collecte les données et génère votre rapport complet.',
  },
  {
    number: '03',
    title: 'Recevez et optimisez',
    description: 'Votre rapport arrive par email. Appliquez les recommandations pour améliorer vos scores et votre expérience utilisateur.',
  },
];

function PlanBadge({ plan }: { plan: string | null }) {
  if (!plan) return null;
  const color = plan === 'Pro'
    ? 'bg-accent-soft text-accent border border-accent/30'
    : 'bg-surface text-text-muted border border-border';
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {plan}
    </span>
  );
}

export default function FonctionnalitesPage() {
  return (
    <main className="min-h-screen bg-bg">
    
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center">
        <p className="velifa-eyebrow mb-5">Fonctionnalités</p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 leading-tight">
          Tout ce qu&apos;il faut pour des<br className="hidden md:block" />
          sites plus rapides
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Velifa vous donne toutes les clés pour comprendre, mesurer et améliorer les performances de vos sites web.
        </p>
      </section>

      {/* ── Features grid ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="velifa-card flex flex-col gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-velifa-md flex items-center justify-center"
                  style={{ background: 'var(--accent-soft)' }}>
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                {/* Title + badge */}
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-heading font-semibold text-text leading-tight">
                    {feature.title}
                  </h2>
                  <PlanBadge plan={feature.plan} />
                </div>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="text-center mb-14">
          <p className="velifa-eyebrow mb-4">Comment ça marche</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text">
            En 3 étapes, votre rapport
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              {/* Number */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                style={{ background: 'var(--accent-soft)', border: '2px solid var(--accent)' }}>
                <span className="font-heading font-bold text-xl text-accent">{step.number}</span>
              </div>
              {/* Content */}
              <h3 className="font-heading font-semibold text-lg text-text mb-3">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Connector arrows (desktop) */}
        <div className="hidden md:flex justify-center items-center gap-4 mt-[-2rem] mb-[-2rem] relative z-10">
          <div className="velifa-divider w-24" />
          <ArrowRight className="w-5 h-5 text-accent" />
          <div className="velifa-divider w-24" />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="velifa-card text-center py-12 px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-text mb-4">
            Prêt à analyser votre site ?
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
          Velifa effectue les audits de performance. Les scores sont calculés selon une méthodologie reconnue.
        </p>
      </div>
    </main>
  );
}