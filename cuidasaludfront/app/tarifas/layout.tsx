import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifas - Plan de Urgencias Médicas | CuidaSalud',
  description: 'Conoce nuestras tarifas mensuales por rango de edad. Desde $15 al mes. Servicio médico accesible y profesional.',
};

export default function TarifasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

