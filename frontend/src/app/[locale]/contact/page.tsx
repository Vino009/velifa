import Link from 'next/link';
import { Zap, MessageCircle, Mail, ArrowRight } from 'lucide-react';

const contacts = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    description: 'Contactez-nous directement sur WhatsApp pour toute question.',
    href: 'https://wa.me/2290162026418', // ← remplacer par votre numéro
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    description: 'Envoyez-nous un email à l\'adresse suivante.',
    href: 'mailto:contact@velifa.io', // ← remplacer par votre email
    external: false,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg">
    

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="velifa-eyebrow mb-5">Contact</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-text mb-5">
          Parlons de votre site
        </h1>
        <p className="text-text-muted text-base md:text-lg leading-relaxed">
          Une question sur Velifa, un besoin particulier ou un projet à discuter ? Nous sommes à votre écoute.
        </p>
      </section>

      {/* ── Contact cards ────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.external ? '_blank' : undefined}
                rel={contact.external ? 'noopener noreferrer' : undefined}
                className="velifa-card flex flex-col items-center text-center p-8 hover:border-accent transition-colors group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-velifa-lg flex items-center justify-center mb-5 transition-colors"
                  style={{ background: 'var(--accent-soft)' }}>
                  <Icon className="w-7 h-7 text-accent" />
                </div>

                {/* Label */}
                <h2 className="font-heading font-semibold text-text text-lg mb-2 group-hover:text-accent transition-colors">
                  {contact.label}
                </h2>

                {/* Description */}
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  {contact.description}
                </p>

                {/* Placeholder hint */}
                {contact.href === 'https://wa.me/22900000000' && (
                  <p className="text-text-subtle text-xs">Placeholder — à remplacer</p>
                )}
                {contact.href === 'mailto:contact@velifa.io' && (
                  <p className="text-text-subtle text-xs">Placeholder — à remplacer</p>
                )}
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Audit CTA ────────────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div className="velifa-card text-center py-8 px-6">
          <p className="text-text-muted text-sm mb-5">
            Vous pouvez aussi lancer un audit gratuit de votre site.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="velifa-btn">
              Lancer un audit gratuit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/faq" className="velifa-btn velifa-btn--ghost">
              Voir la FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer note ───────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 pb-16 text-center">
        <p className="text-text-subtle text-xs">
          Velifa effectue les audits de performance.
        </p>
      </div>
    </main>
  );
}