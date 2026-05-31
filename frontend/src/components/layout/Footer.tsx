import Link from 'next/link';
import { Zap } from 'lucide-react';

const columns: Array<{ title: string; links: Array<{ label: string; href: '/fonctionnalites' | '/tarifs' | '/faq' | '/a-propos' | '/contact' | '/mentions-legales' | '/confidentialite' }> }> = [
  {
    title: 'Produit',
    links: [
      { label: 'Fonctionnalités', href: '/fonctionnalites' as const },
      { label: 'Tarifs',          href: '/tarifs' as const },
      { label: 'FAQ',            href: '/faq' as const },
    ],
  },
  {
    title: 'Entreprise',
    links: [
      { label: 'À propos',  href: '/a-propos' as const },
      { label: 'Contact',   href: '/contact' as const },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales',  href: '/mentions-legales' as const },
      { label: 'Confidentialité',   href: '/confidentialite' as const },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-bg-subtle border-t border-border">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <span className="velifa-wordmark text-sm">VELIFA</span>
            </Link>
            <p className="text-text-subtle text-xs leading-relaxed">
              Performance Beyond Limits
            </p>
            {/* Social placeholders */}
            <div className="flex items-center gap-3 mt-5">
              {['Twitter', 'LinkedIn'].map((social) => (
                <button
                  key={social}
                  disabled
                  className="text-xs text-text-subtle opacity-50 cursor-not-allowed"
                  title={`${social} — à venir`}
                >
                  {social}
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading font-semibold text-text text-sm mb-4">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      target="_blank"
                      href={href}
                      className="text-sm text-text-muted hover:text-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-subtle text-xs">
            © {new Date().getFullYear()} Velifa · Performance Beyond Limits
          </p>
          <p className="text-text-subtle text-xs">
            Propulsé par{' '}
            <a
              href="https://pagespeed.web.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover"
            >
              Google PageSpeed Insights
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}