'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Loader2, Zap, BarChart2, Mail, MessageCircle, ArrowRight,
  Shield, Clock, Globe, CheckCircle2, ArrowUpRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

// ── Formulaire d'audit — logique conservée telle quelle ────────────────────────
function AuditForm() {
  const router = useRouter();
  const [url, setUrl]     = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.createAnalysis({
        url, email, cfTurnstileToken: 'dev-bypass', locale: 'fr',
      });
      const { id, cached } = res.data;
      if (cached) {
        router.push(`/analyse/${id}`);
      } else {
        router.push(`/analyse/loading-page?id=${id}`);
      }
    } catch (err: any) {
      setError(err.message ?? 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="velifa-card text-left space-y-4"
      style={{ background: 'var(--surface)', maxWidth: '600px', margin: '0 auto' }}
    >
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          URL de votre site
        </label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://votre-site.com"
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-border rounded-velifa-md text-text bg-surface placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent-ring focus:border-transparent transition disabled:opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-text mb-1.5">
          Votre email
          <span className="text-text-muted font-normal ml-1">(pour recevoir le rapport)</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          required
          disabled={loading}
          className="w-full px-4 py-3 border border-border rounded-velifa-md text-text bg-surface placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent-ring focus:border-transparent transition disabled:opacity-50"
        />
      </div>

      {error && (
        <div className="text-sm text-score-poor bg-score-poor-bg border border-score-poor rounded-velifa-md px-4 py-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="velifa-btn w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Lancement de l&apos;analyse...</>
        ) : (
          <>Analyser maintenant <ArrowRight className="w-4 h-4" /></>
        )}
      </button>

      <p className="text-xs text-center text-text-subtle">
        En soumettant, vous acceptez notre{' '}
        <Link href="/confidentialite" className="text-accent hover:text-accent-hover underline">
          politique de confidentialité
        </Link>. Aucun spam.
      </p>
    </form>
  );
}

// ── Page d'accueil ─────────────────────────────────────────────────────────────
export default function HomePage() {
  const keyFeatures = [
    { icon: BarChart2,    title: 'Score détaillé',           desc: 'Performance, SEO, Accessibilité, Best Practices et Core Web Vitals complets.' },
    { icon: Mail,         title: 'Rapport par email',         desc: 'Rapport complet envoyé sur votre email avec un lien de résultats persistant.' },
    { icon: MessageCircle,title: 'Accompagnement WhatsApp',   desc: 'Un expert vous contacte via WhatsApp pour améliorer vos métriques rapidement.' },
    { icon: Shield,       title: 'Données protégées',         desc: 'Aucune donnée revendue, usage limité à l\'audit.' },
  ];

  const steps = [
    { number: '01', title: 'Entrez l\'URL',       desc: 'Saisissez l\'adresse du site à analyser. Aucun compte requis.' },
    { number: '02', title: 'Analyse Lighthouse', desc: 'Velifa lance les tests mobile et desktop via Google PageSpeed Insights.' },
    { number: '03', title: 'Rapport par email',   desc: 'Recevez un rapport complet avec scores, Core Web Vitals et recommandations.' },
  ];

  const plansPreview = [
    { name: 'Gratuit',  price: '0',  features: ['Audit ponctuel', '4 scores Lighthouse', 'Capture d\'écran', 'Rapport email'] },
    { name: 'Pro',      price: '9',  features: ['Tout le Gratuit', 'Historique', 'Suivi des scores', 'Audits illimités'], badge: 'Populaire' },
    { name: 'Business', price: '29', features: ['Tout le Pro', 'Multi-sites', 'Audits programmés', 'Export PDF + API'] },
  ];

  return (
    <main className="min-h-screen bg-bg">

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* HERO */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent-soft border border-border rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Analyse en 30 secondes · Rapport complet · 100% gratuit
        </div>

        <h1 className="font-heading text-5xl md:text-6xl font-bold text-text leading-tight mb-6 tracking-tight">
          Auditez et optimisez la<br className="hidden md:block" />
          <span className="velifa-gold-text">performance de votre site</span>
        </h1>

        <p className="text-xl text-text-muted mb-14 leading-relaxed max-w-xl mx-auto">
          Identifiez les faiblesses de votre site en quelques secondes.
          Des Core Web Vitals au score Lighthouse — avec un plan d&apos;amélioration actionnable.
        </p>

        {/* Formulaire (inchangé — logique intacte) */}
        <AuditForm />
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TRUST BADGES */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <div className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-text-subtle">
            {[
              { icon: Shield, text: 'Aucune donnée revendue' },
              { icon: Clock,  text: 'Résultat en moins de 30s' },
              { icon: Zap,    text: 'Propulsé par Google PageSpeed' },
              { icon: Globe,  text: 'Compatible tout site public' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-accent" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* FONCTIONNALITÉS CLÉS */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="velifa-eyebrow mb-4">Fonctionnalités</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
            Un audit complet, pas à pas
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-base">
            Velifa vous donne toutes les métriques nécessaires pour comprendre et améliorer la performance de votre site.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {keyFeatures.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="velifa-card">
              <div className="w-10 h-10 rounded-velifa-md flex items-center justify-center mb-4"
                style={{ background: 'var(--accent-soft)' }}>
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-text mb-2">{title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/fonctionnalites" className="velifa-btn velifa-btn--ghost inline-flex items-center gap-2">
            Voir toutes les fonctionnalités
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* COMMENT ÇA MARCHE */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="bg-bg-subtle border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="velifa-eyebrow mb-4">Comment ça marche</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
              En 3 étapes, votre rapport
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {steps.map((step, i) => (
              <div key={step.number} className="text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 right-0 translate-x-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-accent" />
                  </div>
                )}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
                  style={{ background: 'var(--accent-soft)', border: '2px solid var(--accent)' }}>
                  <span className="font-heading font-bold text-xl text-accent">{step.number}</span>
                </div>
                <h3 className="font-heading font-semibold text-text text-lg mb-3">{step.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="#" className="velifa-btn inline-flex items-center gap-2">
              Lancer un audit gratuit <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* TARIFS APERÇU */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="velifa-eyebrow mb-4">Tarifs</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
            Un plan pour chaque besoin
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-base">
            Du premier audit gratuit au suivi avancé de vos performances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {plansPreview.map((plan) => (
            <div
              key={plan.name}
              className={`velifa-card relative flex flex-col ${plan.badge ? 'border-accent' : ''}`}
              style={plan.badge ? { borderWidth: '2px', boxShadow: 'var(--shadow-gold)' } : {}}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-velifa-black"
                    style={{ background: 'var(--velifa-gradient-gold)' }}>
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="text-center mb-4 pt-2">
                <h3 className={`font-heading font-bold text-lg mb-1 ${plan.badge ? 'velifa-gold-text' : 'text-text'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-heading text-4xl font-bold text-text">{plan.price}</span>
                  <span className="text-text-muted text-sm">€/mois</span>
                </div>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 score-good flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/tarifs" className="velifa-btn velifa-btn--ghost inline-flex items-center gap-2">
            Voir les tarifs détaillés
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════ */}
      {/* CTA FINAL */}
      {/* ══════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-5">
            Prêt à booster votre site ?
          </h2>
          <p className="text-text-muted mb-10 text-base">
            Lancez votre premier audit gratuit — moins de 30 secondes pour connaître vos scores.
          </p>
          <a href="#" className="velifa-btn inline-flex items-center gap-2">
            Analyser mon site maintenant
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </main>
  );
}