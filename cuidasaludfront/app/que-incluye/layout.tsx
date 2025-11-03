import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qué Incluye - Coberturas Médicas | CuidaSalud',
  description: 'Descubre todas las coberturas médicas incluidas en tu plan: cirugía general, traumatología, medicina interna, ecografías y más. Atención 24/7.',
};

export default function QueIncluyeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

