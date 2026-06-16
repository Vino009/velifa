import Link from 'next/link';
import { Zap } from 'lucide-react';

const sections = [
  {
    title: '1. Responsable du traitement',
    content: (
      <p>
        Le responsable du traitement des données personnelles est :<br />
        <strong>[Nom de l&apos;entreprise — à compléter]</strong><br />
        [Adresse — à compléter]<br />
        Email : <strong>[adresse@email.com — à compléter]</strong>
      </p>
    ),
  },
  {
    title: '2. Données collectées',
    content: (
      <>
        <p className="mb-3">
          Velifa collecte les données suivantes :
        </p>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Adresse email</strong> — fournie par l&apos;utilisateur lors de la soumission d&apos;un audit, pour recevoir le rapport de performance.</li>
          <li><strong>URL analysée</strong> — l&apos;adresse du site web soumis à l&apos;audit.</li>
          <li><strong>Données d&apos;audit</strong> — scores de performance, Core Web Vitals, captures d&apos;écran et recommandations générées par Velifa.</li>
          <li><strong>Données de navigation</strong> —有限的 logs techniques (adresse IP, user-agent, timestamps) utilisés uniquement pour le fonctionnement du service.</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Finalités du traitement',
    content: (
      <p>
        Les données collectées sont utilisées exclusively pour :
      </p>
    ),
  },
  {
    title: '3. Finalités du traitement',
    content: (
      <>
        <p className="mb-3">Les données collectées sont utilisées exclusivement pour :</p>
        <ul className="space-y-2 list-disc list-inside">
          <li>Effectuer l&apos;audit de performance demandé par l&apos;utilisateur.</li>
          <li>Envoyer le rapport de performance à l&apos;adresse email fournie.</li>
          <li>Stocker les résultats d&apos;audit pour les comptes Pro/Business (historique et suivi).</li>
          <li>Améliorer le fonctionnement du service Velifa.</li>
        </ul>
        <p className="mt-4">
          Aucune donnée n&apos;est utilisée à des fins de marketing ou de prospection commerciale.
        </p>
      </>
    ),
  },
  {
    title: '4. Base légale',
    content: (
      <p>
        Le traitement des données repose sur l&apos;exécution du contrat demandé par l&apos;utilisateur
        (audit de performance et envoi du rapport). Le consentement explicite de l&apos;utilisateur
        est recueilli lors de la soumission de l&apos;audit.
      </p>
    ),
  },
  {
    title: '5. Services tiers utilisés',
    content: (
      <>
        <p className="mb-4">Velifa fait appel aux services tiers suivants :</p>
        <ul className="space-y-3 list-disc list-inside">
          <li>
            <strong>Velifa</strong> — utilisé pour effectuer les audits de performance.
            <span className="text-text-subtle text-xs block mt-1 ml-4">Politique de confidentialité Google : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline">https://policies.google.com/privacy</a></span>
          </li>
          <li>
            <strong>Brevo</strong> — utilisé pour l&apos;envoi des rapports par email.
            <span className="text-text-subtle text-xs block mt-1 ml-4">Politique de confidentialité Brevo : <a href="https://www.brevo.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover underline">https://www.brevo.com/legal/privacy/</a></span>
          </li>
          <li>
            <strong>[Nom de l&apos;hébergeur — à compléter, ex. Vercel]</strong> — infrastructure d&apos;hébergement du site.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: '6. Durée de conservation',
    content: (
      <p>
        Les données d&apos;audit sont conservées pendant une durée de <strong>[durée en mois/années — à compléter]</strong>.
        Les données des comptes Pro/Business sont conservées tant que le compte est actif.
        Les logs techniques sont conservés pendant <strong>[durée — à compléter]</strong>.
        Passé ce délai, les données sont supprimées ou anonymisées.
      </p>
    ),
  },
  {
    title: '7. Partage des données',
    content: (
      <p>
        Velifa ne partage pas vos données personnelles avec des tiers, sauf dans les cas suivants :
      </p>
    ),
  },
  {
    title: '7. Partage des données',
    content: (
      <>
        <ul className="space-y-2 list-disc list-inside mb-4">
          <li>Avec les prestataires de services strictement nécessaires au fonctionnement de Velifa (hébergement, email), boundés par des accords de confidentialité.</li>
          <li>Si la loi l&apos;exige, en réponse à une procédure judiciaire ou à une demande des autorités compétentes.</li>
        </ul>
        <p>
          Velifa ne vend ni ne loue jamais vos données personnelles.
        </p>
      </>
    ),
  },
  {
    title: '8. Vos droits',
    content: (
      <>
        <p className="mb-4">
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :
        </p>
        <ul className="space-y-2 list-disc list-inside mb-4">
          <li><strong>Droit d&apos;accès</strong> — obtenir une copie de vos données personnelles.</li>
          <li><strong>Droit de rectification</strong> — corriger toute donnée inexacte ou incomplète.</li>
          <li><strong>Droit à l&apos;effacement</strong> — demander la suppression de vos données (dans les limites des obligations légales de conservation).</li>
          <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré et lisible.</li>
          <li><strong>Droit d&apos;opposition</strong> — vous opposer au traitement de vos données pour des motifs légitimes.</li>
        </ul>
        <p>
          Pour exercer l&apos;un de ces droits, contactez-nous à : <strong>[adresse@email.com — à compléter]</strong>.
        </p>
      </>
    ),
  },
  {
    title: '9. Sécurité des données',
    content: (
      <p>
        Velifa met en oeuvre des mesures de sécurité techniques et organisationnelles appropriées pour
        protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction.
        Cela inclut le chiffrement des communications (HTTPS), l&apos;accès restreint aux données, et le suivi
        régulier des pratiques de sécurité.
      </p>
    ),
  },
  {
    title: '10. Cookies',
    content: (
      <p>
        Le site Velifa utilise des cookies strictement nécessaires au fonctionnement du service.
        Aucun cookie de tracking ou de marketing n&apos;est utilisé sans votre consentement explicite.
        Pour plus de détails, consultez notre politique de cookies.
      </p>
    ),
  },
  {
    title: '11. Modifications de cette politique',
    content: (
      <p>
        Cette politique de confidentialité peut être mise à jour périodiquement.
        La date de dernière mise à jour est indiquée en haut de cette page.
        Nous vous encourageons à la consulter régulièrement.
      </p>
    ),
  },
  {
    title: '12. Contact',
    content: (
      <p>
        Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles,
        contactez-nous à l&apos;adresse suivante :<br />
        <strong>Email :</strong> [adresse@email.com — à compléter]<br />
        <strong>WhatsApp :</strong> [https://wa.me/22900000000 — à remplacer]
      </p>
    ),
  },
];

export default function ConfidentialitePage() {
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
          Politique de confidentialité
        </h1>
        <p className="text-text-muted text-sm mb-10">
          Dernière mise à jour : [JJ/MM/AAAA — à compléter]
        </p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
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