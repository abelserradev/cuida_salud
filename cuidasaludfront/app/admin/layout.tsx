import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Panel de Administración - CuidaSalud',
  description: 'Panel de gestión de usuarios y afiliados de CuidaSalud',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

