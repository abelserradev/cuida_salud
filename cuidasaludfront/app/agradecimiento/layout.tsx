import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CuidaSalud - Contacto y Agradecimientos',
  description: 'Gracias por revisar esta prueba técnica. Proyecto desarrollado con Next.js, React y Tailwind CSS.',
};

export default function ContactoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

