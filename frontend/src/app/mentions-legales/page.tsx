import Link from 'next/link';
import { Zap } from 'lucide-react';

const sections = [
  {
    title: '1. Informations éditeur',
    content: (
      <>
        <p className="mb-3">
          <strong>Nom de l&apos;entreprise :</strong> [Nom de l&apos;entreprise — à compléter]
        </p>
        <p className="mb-3">
          <strong>Statut juridique :</strong> [Statut juridique — à compléter]
        </p>
        <p className="mb-3">
          <strong>Adresse :</strong> [Adresse complète — à compléter]
        </p>
        <p className="mb-3">
          <strong>Numéro d&apos;immatriculation :</strong> [Numéro d&apos;immatriculation — à compléter]
        </p>
        <p className="mb-3">
          <strong>Email de contact :</strong> [adresse@email.com — à compléter]
        </p>
        <p>
          <strong>Téléphone :</strong> [Numéro de téléphone — à compléter]
        </p>
      </>
    ),
  },
  {
    title: '2. Directeur de publication',
    content: (
      <p>
        <strong>Nom :</strong> [Nom et prénom du directeur de publication — à compléter]
      </p>
    ),
  },
  {
    title: '3. Hébergement',
    content: (
      <p>
        Le site Velifa est hébergé par : [Nom de l&apos;hébergeur — à compléter, ex. Vercel Inc., Netlify Inc.],
        [Adresse de l&apos;hébergeur — à compléter].<br />
        URL de l&apos;hébergeur : [https://www.vercel.com — à compléter]
      </p>
    ),
  },
  {
    title: '4. Propriété intellectuelle',
    content: (
      <p>
        L&apos;ensemble du contenu présent sur le site Velifa (textes, images, logos, graphismes, outils,
        design) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation,
        modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen
        ou le processus utilisé, est interdite sans l&apos;autorisation écrite préalable de [Nom de l&apos;entreprise — à compléter].
      </p>
    ),
  },
  {
    title: '5. Crédits',
    content: (
      <p>
        Les icônes utilisées sur le site sont fournies par <strong>Lucide</strong> (licence ISC).
        Les audits de performance sont réalisés via <strong>Google PageSpeed Insights</strong>.
      </p>
    ),
  },
  {
    title: '6. Liens hypertextes',
    content: (
      <p>
        Le site Velifa peut contenir des liens hypertextes vers d&apos;autres sites. Ces liens sont fournis
        uniquement pour la commodité de l&apos;utilisateur. [Nom de l&apos;entreprise — à compléter] n&apos;assume
        aucune responsabilité quant au contenu de ces sites tiers.
      </p>
    ),
  },
  {
    title: '7. Limitation de responsabilité',
    content: (
      <p>
        Les informations contenues sur ce site sont aussi précises que possible. Le site est périodiquement
        mis à jour, mais des inexactitudes, des omissions ou des lacunes peuvent néanmoins exister. [Nom de l&apos;entreprise — à compléter]
        ne saurait être tenue responsable des conséquences directes ou indirectes liées à l&apos;utilisation
        des informations disponibles sur ce site.
      </p>
    ),
  },
  {
    title: '8. Contact',
    content: (
      <p>
        Pour toute question concernant les mentions légales, contactez-nous à l&apos;adresse suivante :<br />
        <strong>Email :</strong> [adresse@email.com — à compléter]<br />
        <strong>WhatsApp :</strong> [https://wa.me/22900000000 — à remplacer]
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-bg">
     
      {/* ── Notice ──────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        <div className="bg-score-average/10 border border-score-average/30 rounded-velifa-md px-5 py-4 mb-8">
          <p className="text-score-average text-sm leading-relaxed">
            <strong>Modèle à faire valider juridiquement.</strong> Les informations marquées
            par [crochets] sont des placeholders à compléter avant publication.
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 pb-20">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-text mb-3">
          Mentions légales
        </h1>
        <p className="text-text-muted text-sm mb-10">
          Dernière mise à jour : [JJ/MM/AAAA — à compléter]
        </p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-heading font-semibold text-text text-lg mb-4 pb-3 border-b border-border">
                {section.title}
              </h2>
              <div className="text-text-muted text-sm leading-relaxed space-y-1">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 pb-16 text-center">
        <Link href="/" className="text-text-subtle text-xs hover:text-accent transition-colors">
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}