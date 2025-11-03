import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { checkAuthAction } from '@/app/actions/auth';

export const metadata: Metadata = {
  title: 'Autenticación - CuidaSalud',
  description: 'Inicia sesión o regístrate en CuidaSalud',
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar si el usuario ya está autenticado
  const { isAuthenticated } = await checkAuthAction();

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}

