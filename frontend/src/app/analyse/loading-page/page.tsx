'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAnalysisStatus } from '@/hooks/useAnalysisStatus';
import { Loader2, Globe, BarChart2, Mail, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { icon: Globe,        label: 'Accès au site en cours...' },
  { icon: BarChart2,    label: 'Analyse PageSpeed (mobile + desktop)...' },
  { icon: BarChart2,    label: 'Calcul des Core Web Vitals...' },
  { icon: Mail,         label: "Génération du rapport..." },
];

export default function LoadingPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <LoadingContent />
    </Suspense>
  );
}

function LoadingSkeleton() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full border-4 border-surface border-t-accent animate-spin" />
        <div className="h-8 w-48 mx-auto mb-2 rounded bg-surface animate-pulse" />
        <div className="h-4 w-32 mx-auto rounded bg-surface animate-pulse" />
      </div>
    </main>
  );
}

function LoadingContent() {
  const params     = useSearchParams();
  const id         = params.get('id') ?? '';
  const { status, error } = useAnalysisStatus(id || null);

  const stepIndex =
    status === 'pending'     ? 0 :
    status === 'processing'  ? 2 : 3;

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {error ? (
          <div>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Analyse échouée</h1>
            <p className="text-gray-500 text-sm mb-6">{error}</p>
            <a href="/" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition">
              Réessayer
            </a>
          </div>
        ) : (
          <>
            {/* Spinner */}
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="w-20 h-20 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart2 className="w-7 h-7 text-blue-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">Analyse en cours</h1>
            <p className="text-gray-500 mb-10 text-sm">Environ 20–30 secondes</p>

            {/* Steps */}
            <div className="space-y-3 text-left">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const done = i < stepIndex;
                const active = i === stepIndex;
                return (
                  <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    active ? 'bg-blue-50 border border-blue-100' :
                    done   ? 'opacity-50' : 'opacity-30'
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      done ? 'bg-green-100' : active ? 'bg-blue-100' : 'bg-gray-100'
                    }`}>
                      {done
                        ? <CheckCircle2 className="w-4 h-4 text-green-600" />
                        : active
                        ? <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                        : <Icon className="w-4 h-4 text-gray-400" />
                      }
                    </div>
                    <span className={`text-sm font-medium ${active ? 'text-blue-700' : done ? 'text-gray-500 line-through' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
