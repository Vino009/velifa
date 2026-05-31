import type { Metadata } from 'next';
import { Orbitron, Chakra_Petch, Sora } from 'next/font/google';
import './globals.css';
import '@/styles/velifa-design-system.css';
import ClientLayout from '@/components/layout/ClientLayout';
import Footer from '@/components/layout/Footer';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--velifa-font-brand',
  display: 'swap',
});

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--velifa-font-heading',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--velifa-font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VELIFA — Audit de Performance Web',
  description: 'Analysez la performance de votre site e-commerce en 30 secondes. Score, Core Web Vitals, rapport détaillé.',
  keywords: ['audit performance', 'Velifa', 'Core Web Vitals', 'SEO', 'e-commerce'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVariables = [orbitron.variable, chakraPetch.variable, sora.variable].join(' ');

  return (
    <html lang="fr" data-theme="dark" className={fontVariables}>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
        <Footer />
      </body>
    </html>
  );
}