'use client';
import { useState } from 'react';
import { Loader2, Zap, BarChart2, Mail, MessageCircle, ArrowRight, Shield, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function HomePage() {
  const router = useRouter();
  const [url, setUrl]         = useState('');
  const [email, setEmail]     = useState('');
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
    <main className="min-h-screen bg-bg">
      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="border-b border-border px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="velifa-wordmark text-sm">VELIFA</span>
        </div>
        <span className="velifa-eyebrow text-xs" style={{ letterSpacing: '0.1em' }}>
          Audit gratuit
        </span>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-accent bg-accent-soft border border-border rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Analyse en 30 secondes · Rapport complet · 100% gratuit
        </div>

        <h1 className="font-heading text-5xl font-bold text-text leading-tight mb-5 tracking-tight">
          Votre site est-il{' '}
          <span className="velifa-gold-text">vraiment rapide</span> ?
        </h1>

        <p className="text-xl text-muted mb-12 leading-relaxed max-w-xl mx-auto">
          Analysez les Core Web Vitals, le score PageSpeed et les opportunités
          d&apos;amélioration de votre site e-commerce en quelques secondes.
        </p>

        {/* ── Form ──────────────────────────────────────────────────────── */}
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
              placeholder="https://votre-boutique.com"
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-border rounded-velifa-md text-text bg-surface placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-accent-ring focus:border-transparent transition disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1.5">
              Votre email
              <span className="text-muted font-normal ml-1">(pour recevoir le rapport)</span>
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

          <p className="text-xs text-center text-subtle">
            En soumettant, vous acceptez notre politique de confidentialité. Aucun spam.
          </p>
        </form>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: BarChart2, title: 'Score détaillé', desc: 'Performance, SEO, Accessibilité, Best Practices et Core Web Vitals complets.' },
            { icon: Mail,      title: 'Rapport par email', desc: 'Rapport complet envoyé sur votre email avec le lien de résultats persistant.' },
            { icon: MessageCircle, title: 'Accompagnement direct', desc: "Un expert vous contacte via WhatsApp pour améliorer vos métriques rapidement." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="velifa-card">
              <div
                className="w-10 h-10 rounded-velifa-md border border-border flex items-center justify-center mb-4"
                style={{ background: 'var(--surface-raised)' }}
              >
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-text mb-2">{title}</h3>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-subtle">
          {[
            { icon: Shield, text: 'Aucune donnée revendue' },
            { icon: Clock,  text: 'Résultat en < 30s' },
            { icon: Zap,    text: 'Propulsé par Google PageSpeed' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-accent" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}