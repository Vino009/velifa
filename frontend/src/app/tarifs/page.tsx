'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { Check, Zap, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

// ── Plan definitions ──────────────────────────────────────────────────────
const plans = [
  {
    key: null as null,
    name: 'Gratuit',
    price: '0',
    period: '€/mois',
    description: 'Pour découvrir Velifa et analyser votre premier site.',
    cta: 'Lancer un audit',
    ctaHref: '/' as const,
    ctaVariant: 'ghost' as const,
    badge: null,
    featured: false,
    features: [
      "Audit ponctuel d'une URL",
      '4 scores de performance + Core Web Vitals',
      "Capture d'écran du site",
      'Rapport envoyé par email',
    ],
  },
  {
    key: 'pro' as const,
    name: 'Pro',
    price: '9',
    period: '€/mois',
    description: 'Pour suivre et améliorer vos performances dans le temps.',
    cta: 'Choisir Pro',
    ctaHref: null,
    ctaVariant: 'gold' as const,
    badge: 'Populaire',
    featured: true,
    features: [
      'Tout le plan Gratuit',
      'Compte personnel + tableau de bord',
      'Historique de tous vos audits',
      "Suivi de l'évolution des scores",
      'Audits illimités',
      'Support prioritaire',
    ],
  },
  {
    key: 'business' as const,
    name: 'Business',
    price: '29',
    period: '€/mois',
    description: 'Pour les équipes et les projets à grande échelle.',
    cta: 'Choisir Business',
    ctaHref: null,
    ctaVariant: 'ghost' as const,
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
] as const;

// ── Checkout button ───────────────────────────────────────────────────────
function CheckoutButton({
  plan,
  label,
  variant,
  userEmail,
}: {
  plan: 'pro' | 'business';
  label: string;
  variant: 'gold' | 'ghost';
  userEmail: string | null;
}) {
  const router = useRouter();
  const { isSignedIn, getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);

    // Redirect to sign-in if not authenticated
    if (!isSignedIn) {
      router.push(`/sign-in?redirect_url=/tarifs`);
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      if (!token) throw new Error('Token introuvable');

      const res = await api.createCheckout(
        { plan, email: userEmail ?? undefined },
        token,
      );

      const url = res.data?.checkoutUrl;
      if (!url) throw new Error('URL de paiement introuvable');

      // Hard redirect to Lemon Squeezy hosted checkout
      window.location.href = url;
    } catch (err: any) {
      setError(err.message ?? 'Une erreur est survenue');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`velifa-btn w-full flex items-center justify-center gap-2 ${variant === 'ghost' ? 'velifa-btn--ghost' : ''} ${loading ? 'opacity-70 cursor-wait' : ''}`}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Zap className="w-4 h-4" />
        )}
        {loading ? 'Redirection…' : label}
      </button>
      {error && (
        <p className="text-center text-xs" style={{ color: 'var(--velifa-score-poor)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function TarifsPage() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress ?? null;

  return (
    <main className="min-h-screen bg-bg">

      {/* ── Hero ──────────────────────────────────────────────────── */}
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

      {/* ── Plans ─────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`velifa-card relative flex flex-col transition-all duration-300 hover:-translate-y-1 ${plan.featured ? 'border-accent' : ''}`}
              style={
                plan.featured
                  ? { borderWidth: '2px', boxShadow: 'var(--shadow-gold)' }
                  : { boxShadow: '0 4px 20px rgba(0,0,0,0.45)' }
              }
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
              {plan.ctaHref !== null ? (
                /* Plan Gratuit — simple lien */
                <Link
                  href={plan.ctaHref}
                  className="velifa-btn velifa-btn--ghost w-full text-center"
                >
                  {plan.cta}
                </Link>
              ) : (
                /* Plans payants — bouton checkout */
                <CheckoutButton
                  plan={plan.key!}
                  label={plan.cta}
                  variant={plan.ctaVariant}
                  userEmail={userEmail}
                />
              )}
            </div>
          ))}
        </div>

        {/* Note sécurité */}
        <p className="text-center text-text-subtle text-xs mt-10">
          Paiement sécurisé via{' '}
          <span className="velifa-gold-text font-semibold">Lemon Squeezy</span>.
          Résiliable à tout moment. Sans engagement.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-16 text-center">
        <p className="text-text-subtle text-sm">
          Velifa effectue les audits de performance. Les scores sont calculés selon une
          méthodologie reconnue.
        </p>
      </div>
    </main>
  );
}
