import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Tarifas', href: '/tarifas' },
    { name: 'Qué Incluye', href: '/que-incluye' },
    { name: 'Agradecimiento', href: '/agradecimiento' },
  ];

  return (
    <footer className="bg-gradient-to-br from-text-primary via-text-primary to-primary/90 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Columna 1: Información del Proyecto */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Sobre este Proyecto</h3>
            </div>
            <p className="text-white/80 leading-relaxed text-sm">
              Este proyecto fue desarrollado como parte de una prueba técnica para demostrar
              habilidades en desarrollo full-stack con Next.js, React, NestJS y TypeScript.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Desarrollado en {currentYear}</span>
            </div>
          </div>

          {/* Columna 2: Enlaces de Navegación */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold">Navegación</h3>
            </div>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                >
                  <svg
                    className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Columna 3: GitHub */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Image
                  src="/icon/github-logo.svg"
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="filter invert"
                />
              </div>
              <h3 className="text-lg font-bold">Código Fuente</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Explora mis trabajos realizados en mis repositorios de Github.
            </p>
            <Link
              href="https://github.com/abelserradev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-text-primary rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg hover:shadow-2xl hover:scale-105 group"
            >
              <Image
                src="/icon/github-logo.svg"
                alt="GitHub"
                width={20}
                height={20}
              />
              <span>Perfil de Github</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>

            {/* Estadísticas de GitHub */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-xs text-white/60 mb-1">Repositorios</div>
                <div className="text-xl font-bold">27+</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                <div className="text-xs text-white/60 mb-1">Seguidores</div>
                <div className="text-xl font-bold">16+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Parte Inferior del Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo_cuidasalud_completo.svg"
              alt="CuidaSalud"
              width={150}
              height={30}
              className="h-8 w-auto"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="text-white/60 text-sm">
              © {currentYear} CuidaSalud. Proyecto de demostración técnica.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

