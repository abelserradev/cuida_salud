import Image from 'next/image';
import Link from 'next/link';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
   
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 border-2 border-gray-100">
       
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Título Principal */}
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-6">
              ¡Gracias por tu tiempo!
            </h1>

         
            <div className="space-y-6 text-center mb-12">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Agradezco sinceramente que hayan visitado y revisado esta prueba técnica.
              </p>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Espero que haya sido de su agrado y que el proyecto demuestre mis habilidades
                en desarrollo web con <span className="font-bold text-primary">Next.js</span>, 
                <span className="font-bold text-primary"> React</span>, y 
                <span className="font-bold text-primary"> Tailwind CSS</span>.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Este proyecto fue desarrollado con dedicación, aplicando las mejores prácticas
                de desarrollo, diseño responsivo y accesibilidad web.
              </p>
            </div>

          
            <div className="border-t-2 border-gray-100 my-12"></div>

        
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-text-primary text-center mb-8">
                Código del Proyecto
              </h2>

            
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-text-primary rounded-full flex items-center justify-center p-3 shadow-lg">
                      <Image
                        src="/icon/github-logo.svg"
                        alt="GitHub"
                        width={40}
                        height={40}
                        className="filter invert"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">
                        Repositorio en GitHub
                      </h3>
                      <p className="text-gray-600">
                        Ver código fuente completo
                      </p>
                    </div>
                  </div>

             
                  <Link
                    href="https://github.com/abelserradev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-text-primary text-white rounded-xl font-bold text-lg hover:bg-text-primary/90 transition-all shadow-lg hover:shadow-2xl hover:scale-105"
                  >
                    <Image
                      src="/icon/github-logo.svg"
                      alt="GitHub"
                      width={24}
                      height={24}
                      className="filter invert"
                    />
                    Ver Repositorio
                    <svg
                      className="w-5 h-5"
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
                </div>
              </div>

             
              <div className="mt-12">
                <h3 className="text-2xl font-bold text-text-primary text-center mb-6">
                  Tecnologías Implementadas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center hover:border-primary/50 transition-all">
                    <div className="font-bold text-text-primary">Next.js 15</div>
                    <div className="text-sm text-gray-600">Framework</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center hover:border-secondary/50 transition-all">
                    <div className="font-bold text-text-primary">React 19</div>
                    <div className="text-sm text-gray-600">Library</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center hover:border-accent/50 transition-all">
                    <div className="font-bold text-text-primary">TypeScript</div>
                    <div className="text-sm text-gray-600">Language</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200 text-center hover:border-primary/50 transition-all">
                    <div className="font-bold text-text-primary">Tailwind CSS</div>
                    <div className="text-sm text-gray-600">Styling</div>
                  </div>
                </div>
              </div>
            </div>

          
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border-2 border-primary/20">
              <p className="text-center text-gray-700 font-medium">
                💙 Desarrollado con pasión y profesionalismo para CuidaSalud
              </p>
            </div>
          </div>

    
          <div className="text-center mt-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-lg transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

