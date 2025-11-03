import Link from 'next/link';
import Image from 'next/image';

export default function TarifasPage() {
  const tarifas = [
    {
      rangoEdad: 'De 0 a 50 años',
      precio: 15,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200',
      icon: '🏃',
    },
    {
      rangoEdad: 'De 51 a 70 años',
      precio: 20,
      color: 'from-primary to-primary/90',
      borderColor: 'border-primary/30',
      icon: '👨',
    },
    {
      rangoEdad: 'De 71 a 90 años',
      precio: 25,
      color: 'from-secondary to-secondary/90',
      borderColor: 'border-secondary/30',
      icon: '👴',
    },
    {
      rangoEdad: 'De 91 años o más',
      precio: 30,
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-200',
      icon: '🌟',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-text-primary via-primary/20 to-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
              Plan de Urgencias Médicas
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Urgencias Médicas
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
              Creado para brindar un servicio médico accesible, rápido y en manos de 
              profesionales adaptados a tu edad.
            </p>
            <div className="inline-flex flex-col items-center gap-2">
              <p className="text-white/80 text-sm font-medium">A partir de</p>
              <div className="bg-white/95 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-2xl">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-bold text-text-primary">$15</span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-gray-500">USD</span>
                    <span className="text-lg font-semibold text-gray-700">al mes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifas por Edad */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Planes por Rango de Edad
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tu cuota mensual se calcula automáticamente según tu edad. 
              Todos reciben la misma cobertura completa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {tarifas.map((tarifa, index) => (
              <div
                key={index}
                className={`
                  relative bg-white rounded-2xl p-8 border-2 ${tarifa.borderColor}
                  hover:shadow-2xl transition-all duration-300 hover:scale-105
                  group overflow-hidden
                `}
              >
                {/* Background Gradient on Hover */}
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-br ${tarifa.color} 
                    opacity-0 group-hover:opacity-5 transition-opacity duration-300
                  `}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-4 text-center">{tarifa.icon}</div>

                  {/* Rango de Edad */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2 text-center font-medium">
                      Rango de Edad
                    </p>
                    <h3 className="text-xl font-bold text-text-primary text-center">
                      {tarifa.rangoEdad}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-gray-100 my-6" />

                  {/* Precio */}
                  <div className="text-center">
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-5xl font-bold text-text-primary">
                        ${tarifa.precio}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">USD mensual</p>
                  </div>

                  {/* Badge */}
                  {index === 0 && (
                    <div className="mt-6 text-center">
                      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full">
                        Plan más económico
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Nota Importante */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-l-4 border-primary p-6 rounded-r-xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-primary mb-2">
                    Asignación Automática
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    Al crear tu cuenta, nuestro sistema calculará automáticamente tu edad 
                    y te asignará la cuota mensual correspondiente a tu rango. No necesitas 
                    seleccionar ningún plan, todo es transparente y automático.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué Incluye el Plan */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Telemedicina 24/7 */}
              <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Telemedicina 24/7
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-center text-lg">
                  Habla con un médico cuando tengas un malestar de salud, por llamada o videollamada, 
                  sin salir de casa.
                </p>
              </div>

              {/* Atención en Salas de Urgencia */}
              <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg
                      className="w-10 h-10 text-text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Atención Ilimitada en Salas de Urgencia
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-center text-lg">
                  Accede a la red de salas de urgencia más grande del país, cuantas veces lo necesites, 
                  sin importar el día ni la hora.
                </p>
              </div>

              {/* Entrega de Medicamentos */}
              <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg
                      className="w-10 h-10 text-text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Entrega de Medicamentos en Urgent Care
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-center text-lg">
                  Podrás retirar los medicamentos indicados para tu tratamiento en cualquier sede.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

