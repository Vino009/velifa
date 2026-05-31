'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks: Array<{ label: string; href: '/' |  '/fonctionnalites' | '/tarifs' | '/faq' | '/contact' }> = [
  { label: 'Accueil', href: '/' as const },
  { label: 'Fonctionnalités', href: '/fonctionnalites' as const },
  { label: 'Tarifs',          href: '/tarifs' as const },
  { label: 'FAQ',             href: '/faq' as const },
  { label: 'Contact',         href: '/contact' as const }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="velifa-wordmark text-sm">VELIFA</span>
          </Link>

          {/* Nav links */}
          <nav className="flex items-center gap-8">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-text-muted hover:text-accent transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              disabled
              className="velifa-btn velifa-btn--ghost text-xs opacity-50 cursor-not-allowed"
              title="Connexion à venir"
            >
              Connexion
            </button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex md:hidden items-center justify-between">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <span className="velifa-wordmark text-sm">VELIFA</span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-velifa-md text-text-muted hover:text-accent hover:bg-surface transition"
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-border mt-4 space-y-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block py-3 px-2 text-sm text-text-muted hover:text-accent hover:bg-surface-raised rounded-velifa-md transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border mt-3">
              <button
                disabled
                className="w-full py-3 px-2 text-sm text-text-muted opacity-50 cursor-not-allowed text-left"
              >
                Connexion
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}