'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Zap, ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Qu\'est-ce que Velifa ?',
    answer: 'Un outil d\'audit de performance web qui analyse votre site et vous donne des scores et recommandations détaillés.',
  },
  {
    question: 'L\'audit est-il gratuit ?',
    answer: 'Oui, l\'audit ponctuel d\'une URL est gratuit. Les plans Pro et Business ajoutent le suivi dans le temps et d\'autres fonctionnalités.',
  },
  {
    question: 'Comment fonctionne l\'analyse ?',
    answer: 'Vous entrez l\'URL de votre site, Velifa lance une analyse complète (mobile et desktop) et vous renvoie les scores, les Core Web Vitals et une capture d\'écran.',
  },
  {
    question: 'Que mesure Velifa ?',
    answer: 'Performance, Accessibilité, SEO, Bonnes pratiques, ainsi que les Core Web Vitals (LCP, CLS, TBT, FCP).',
  },
  {
    question: 'Vais-je recevoir mon rapport par email ?',
    answer: 'Oui, un rapport est envoyé à l\'adresse email fournie lors de l\'analyse, avec les scores détaillés et les recommandations principales.',
  },
  {
    question: 'Mes données sont-elles en sécurité ?',
    answer: 'Velifa ne collecte que les informations strictement nécessaires à l\'analyse et à l\'envoi du rapport. Aucun usage secondaire n\'est fait de vos données.',
  },
  {
    question: 'Combien de temps prend un audit ?',
    answer: 'La plupart des audits sont terminés en moins d\'une minute. Le temps exact dépend de la taille et de la complexité du site analysé.',
  },
  {
    question: 'Puis-je analyser n\'importe quel site ?',
    answer: 'Oui, tout site accessible publiquement sur internet peut être analysé. Il n\'est pas nécessaire d\'être le propriétaire du site.',
  },
  {
    question: 'Quelle est la différence entre les plans ?',
    answer: (
      <span>
        Le <strong>Gratuit</strong> permet un audit ponctuel par URL. Le{' '}
        <strong>Pro</strong> ajoute un compte personnel avec historique des audits et suivi de l&apos;évolution des scores.{' '}
        Le <strong>Business</strong> inclut plusieurs sites, les audits programmés automatiquement, l&apos;export PDF et l&apos;accès API.{' '}
        <Link href="/tarifs" className="text-accent hover:text-accent-hover underline">Voir les tarifs</Link>
      </span>
    ),
  },
];

function AccordionItem({ question, answer }: { question: string; answer: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="velifa-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 px-6 text-left group"
        aria-expanded={open}
      >
        <span className="font-heading font-semibold text-text text-sm md:text-base leading-relaxed group-hover:text-accent transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 flex-shrink-0 text-accent transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-6">
          <div className="velifa-divider mb-5" />
          <div className="text-text-muted text-sm leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-bg">
      

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="velifa-eyebrow mb-5">FAQ</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-5">
          Questions fréquentes
        </h1>
        <p className="text-text-muted text-base md:text-lg leading-relaxed">
          Tout ce que vous devez savoir sur Velifa et le fonctionnement de l&apos;audit de performance.
        </p>
      </section>

      {/* ── FAQ list ─────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* ── Still have questions ──────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="velifa-card text-center py-10 px-6">
          <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ background: 'var(--accent-soft)' }}>
            <MessageCircle className="w-6 h-6 text-accent" />
          </div>
          <h2 className="font-heading text-xl font-bold text-text mb-3">
            Une autre question ?
          </h2>
          <p className="text-text-muted text-sm mb-6 leading-relaxed">
            N&apos;hésitez pas à nous contacter — nous répondons généralement en few hours.
          </p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="velifa-btn inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Nous contacter
          </a>
        </div>
      </section>

      {/* ── Footer note ───────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 pb-16 text-center">
        <p className="text-text-subtle text-xs">
          Velifa effectue les audits de performance. Les scores sont calculés selon une méthodologie reconnue.
        </p>
      </div>
    </main>
  );
}