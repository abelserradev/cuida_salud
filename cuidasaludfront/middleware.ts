import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedRoutes = ['/dashboard', '/perfil', '/pagos'];

// Rutas de administrador
const adminRoutes = ['/admin'];

// Rutas de autenticación (no accesibles si ya estás autenticado)
const authRoutes = ['/login', '/registro'];

// Rutas públicas
const publicRoutes = ['/', '/tarifas', '/que-incluye', '/contacto'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener token y datos de afiliado de las cookies
  const token = request.cookies.get('auth_token');
  const afiliadoData = request.cookies.get('afiliado_data');
  const isAuthenticated = !!token;

  let isAdmin = false;
  if (afiliadoData) {
    try {
      const afiliado = JSON.parse(afiliadoData.value);
      isAdmin = afiliado.isAdmin === true;
    } catch {
      isAdmin = false;
    }
  }

  // Si intenta acceder a rutas admin sin ser admin, redirigir al login
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated || !isAdmin) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Si intenta acceder a rutas de auth estando autenticado, redirigir según rol
  if (isAuthenticated && authRoutes.some((route) => pathname.startsWith(route))) {
    const redirectUrl = isAdmin ? '/admin' : '/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // Si intenta acceder a rutas protegidas sin autenticación, redirigir al login
  if (!isAuthenticated && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Permitir acceso
  return NextResponse.next();
}

// Configurar qué rutas ejecutan el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

