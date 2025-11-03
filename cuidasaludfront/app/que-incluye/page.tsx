import Image from 'next/image';
import Link from 'next/link';

export default function QueIncluyePage() {
  const servicios = [
    {
      nombre: 'Cirugía General',
      icono: '/icon/img_Cirugía_General_33.svg',
      color: 'from-blue-500 to-blue-600',
    },
    {
      nombre: 'Dolor Lumbar',
      icono: '/icon/img_Dolor_Lumbar_25.svg',
      color: 'from-primary to-primary/90',
    },
    {
      nombre: 'Dolores de Cabeza',
      icono: '/icon/img_Dolores_de_Cabeza_14.svg',
      color: 'from-purple-500 to-purple-600',
    },
    {
      nombre: 'Ecografía',
      icono: '/icon/img_Ecografía_38.svg',
      color: 'from-secondary to-secondary/90',
    },
    {
      nombre: 'Heridas/Cortes',
      icono: '/icon/img_Heridas_Menores_15.svg',
      color: 'from-red-500 to-red-600',
    },
    {
      nombre: 'Medicina Interna',
      icono: '/icon/img_Medicina_Interna_32.svg',
      color: 'from-green-500 to-green-600',
    },
    {
      nombre: 'Radiodiagnóstico',
      icono: '/icon/img_Radiodiagnóstico_36.svg',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      nombre: 'Síndromes Febriles',
      icono: '/icon/img_Síndromes_Febriles_12.svg',
      color: 'from-orange-500 to-orange-600',
    },
    {
      nombre: 'Traumatología',
      icono: '/icon/img_Traumatología_34.svg',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 border-b-4 border-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              CUBRE TU SALUD CON NOSOTROS
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4 leading-relaxed">
              Tenemos atención médica <span className="font-bold text-primary">24/7</span>
            </p>
            <p className="text-xl md:text-2xl text-gray-600">
              y además te cubrimos con:
            </p>
          </div>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicios.map((servicio, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-primary/30"
              >
                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${servicio.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icono */}
                  <div className="mb-6 flex items-center justify-center">
                    <div className={`w-24 h-24 bg-gradient-to-br ${servicio.color} rounded-2xl flex items-center justify-center p-4 shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <Image
                        src={servicio.icono}
                        alt={servicio.nombre}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain filter brightness-0 invert"
                      />
                    </div>
                  </div>

                  {/* Nombre del Servicio */}
                  <h3 className="text-xl font-bold text-text-primary text-center group-hover:text-primary transition-colors">
                    {servicio.nombre}
                  </h3>

                  {/* Checkmark */}
                  <div className="mt-4 flex justify-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección "Y mucho más" */}
      <section className="py-20 bg-gray-50 border-t-4 border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">
              Y mucho más con
            </h2>
            
            {/* Logo Vida Insurtech */}
            <div className="flex justify-center mb-12">
              <div className="bg-[#231F5A] rounded-3xl p-6 border-2 border-gray-200 shadow-lg">
                <Image
                  src="/icon/icono_icono_vidainsurtech_272.png"
                  alt="Vida Insurtech"
                  width={150}
                  height={50}
                  className="mx-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Beneficios Adicionales */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-text-primary font-bold mb-2">Cobertura Total</h4>
                <p className="text-gray-600 text-sm">
                  Protección completa sin límites de consultas
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-text-primary font-bold mb-2">Médicos Expertos</h4>
                <p className="text-gray-600 text-sm">
                  Profesionales certificados en cada especialidad
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h4 className="text-text-primary font-bold mb-2">Respuesta Inmediata</h4>
                <p className="text-gray-600 text-sm">
                  Atención rápida cuando más lo necesitas
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/registro"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Únete Ahora
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/tarifas"
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-primary text-primary rounded-lg font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl"
              >
                Ver Tarifas
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

