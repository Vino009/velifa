import Link from 'next/link';
import { Check, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Gratuit',
    price: '0',
    period: '€/mois',
    description: 'Pour découvrir Velifa et analyser votre premier site.',
    cta: 'Lancer un audit',
    ctaHref: '/',
    ctaVariant: 'ghost',
    badge: null,
    featured: false,
    features: [
      'Audit ponctuel d\'une URL',
      '4 scores de performance + Core Web Vitals',
      'Capture d\'écran du site',
      'Rapport envoyé par email',
    ],
  },
  {
    name: 'Pro',
    price: '9',
    period: '€/mois',
    description: 'Pour suivre et améliorer vos performances dans le temps.',
    cta: 'Choisir Pro',
    ctaHref: null,
    ctaVariant: 'gold',
    badge: 'Populaire',
    featured: true,
    features: [
      'Tout le plan Gratuit',
      'Compte personnel + tableau de bord',
      'Historique de tous vos audits',
      'Suivi de l\'évolution des scores',
      'Audits illimités',
      'Support prioritaire',
    ],
  },
  {
    name: 'Business',
    price: '29',
    period: '€/mois',
    description: 'Pour les équipes et les projets à grande échelle.',
    cta: 'Choisir Business',
    ctaHref: null,
    ctaVariant: 'ghost',
    badge: null,
    featured: false,
    features: [
      'Tout le plan Pro',
      'Plusieurs sites / projets suivis',
      'Audits programmés automatiques',
      'Export des rapports en PDF',
      'Accès API',
    ],
  },
];

export default function TarifsPage() {
  return (
    <main className="min-h-screen bg-bg">
     
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="velifa-eyebrow mb-4">Tarifs</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-4">
          Une solution pour chaque besoin
        </h1>
        <p className="text-text-muted text-lg max-w-xl mx-auto">
          Du premier audit gratuit à la gestion avancée de vos performances web.
          Sans engagement.
        </p>
      </section>

      {/* ── Plans ────────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p className="text-center text-text-subtle text-xs mb-10 tracking-wide uppercase">
          Prix indicatifs — Le paiement n&apos;est pas encore actif.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const disabled = plan.ctaHref === null;

            return (
              <div
                key={plan.name}
                className={`velifa-card relative flex flex-col ${plan.featured ? 'border-accent' : ''}`}
                style={plan.featured ? { borderWidth: '2px', boxShadow: 'var(--shadow-gold)' } : {}}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-block px-4 py-1 rounded-full text-xs font-bold text-velifa-black tracking-wide"
                      style={{ background: 'var(--velifa-gradient-gold)' }}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="text-center mb-6 pt-2">
                  <h2 className={`font-heading font-bold text-lg mb-1 ${plan.featured ? 'velifa-gold-text' : 'text-text'}`}>
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-heading text-5xl font-bold text-text">{plan.price}</span>
                    <span className="text-text-muted text-sm">{plan.period}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-muted text-sm text-center mb-6 leading-relaxed">
                  {plan.description}
                </p>

                <div className="velifa-divider mb-6" />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="w-4 h-4 score-good flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {plan.ctaVariant === 'gold' ? (
                  <button disabled className="velifa-btn w-full opacity-60 cursor-not-allowed">
                    {plan.cta}
                  </button>
                ) : plan.ctaHref !== null ? (
                  <Link href={plan.ctaHref as '/'} className="velifa-btn velifa-btn--ghost w-full text-center">
                    {plan.cta}
                  </Link>
                ) : (
                  <button disabled className="velifa-btn velifa-btn--ghost w-full opacity-40 cursor-not-allowed">
                    {plan.cta}
                  </button>
                )}

                {disabled && (
                  <p className="text-center text-text-subtle text-xs mt-3">Bientôt disponible</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <p className="text-text-subtle text-sm">
          Velifa effectue les audits de performance. Les scores sont calculés selon une méthodologie reconnue.
        </p>
      </div>
    </main>
  );
}