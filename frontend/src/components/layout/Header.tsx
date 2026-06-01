'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Zap, Menu, X } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/ThemeToggle';

const navLinks: Array<{ label: string; href: '/' | '/fonctionnalites' | '/tarifs' | '/faq' | '/contact' }> = [
  { label: 'Accueil',         href: '/' as const },
  { label: 'Fonctionnalités', href: '/fonctionnalites' as const },
  { label: 'Tarifs',         href: '/tarifs' as const },
  { label: 'FAQ',            href: '/faq' as const },
  { label: 'Contact',        href: '/contact' as const },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userId } = useAuth();

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center gap-8">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Zap className="w-5 h-5 text-accent" />
            <span className="velifa-wordmark text-sm">VELIFA</span>
          </Link>

          {/* Nav links — takes the middle space, centers its own content */}
          <nav className="flex-1 flex items-center justify-center gap-8">
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
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />
            {userId ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-text-muted hover:text-accent transition-colors whitespace-nowrap"
                >
                  Mon espace
                </Link>
                <UserButton />
              </>
            ) : (
              <Link
                href="/sign-in"
                className="velifa-btn velifa-btn--ghost text-xs"
              >
                Connexion
              </Link>
            )}
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
            <div className="pt-3 border-t border-border mt-3 flex items-center justify-between">
              {userId ? (
                <>
                  <div className="flex flex-col gap-1">
                    <Link
                      href="/dashboard"
                      className="block py-3 px-2 text-sm text-text-muted hover:text-accent hover:bg-surface-raised rounded-velifa-md transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      Mon espace
                    </Link>
                    <span className="px-2 text-xs text-text-subtle">Mon compte</span>
                  </div>
                  <UserButton />
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className="block py-3 px-2 text-sm text-text-muted hover:text-accent hover:bg-surface-raised rounded-velifa-md transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Connexion
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
