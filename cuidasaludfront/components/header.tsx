'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { useAuth } from '@/lib/auth-context';

const StyledNavLeft = styled.div`
  .outline {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .rect {
    stroke-dashoffset: 5;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s;
    stroke: #3b82f6;
  }

  .nav-wrapper {
    position: relative;
    width: 160px;
    height: 36px;
  }

  .nav-container:hover .outline .rect {
    transition: 999999s;
    stroke-dashoffset: 1;
    stroke-dasharray: 0;
  }

  .nav-container {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 197, 253, 0.08) 100%);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.25em;
    border-radius: 0.5rem;
  }

  .nav-btn {
    padding: 0.35em 0.65em;
    color: #1e293b;
    cursor: pointer;
    transition: 0.15s ease;
    font-weight: 500;
    font-size: 0.8rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-btn:hover {
    background: rgba(59, 130, 246, 0.15);
    border-radius: 0.35rem;
    color: #2563eb;
  }

  /* Inicio - primer botón */
  .nav-btn:nth-child(1):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 2 8 73.3 8 10.7;
  }

  /* Tarifas - segundo botón */
  .nav-btn:nth-child(2):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 24.5 8.5 27.5 8.5 55.5;
  }

  .nav-btn:hover ~ .outline .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s !important;
  }
`;

const StyledNavRight = styled.div`
  .outline {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .rect {
    stroke-dashoffset: 5;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s;
    stroke: #3b82f6;
  }

  .nav-wrapper {
    position: relative;
    width: 220px;
    height: 36px;
  }

  .nav-container:hover .outline .rect {
    transition: 999999s;
    stroke-dashoffset: 1;
    stroke-dasharray: 0;
  }

  .nav-container {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(147, 197, 253, 0.08) 100%);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0.25em;
    border-radius: 0.5rem;
  }

  .nav-btn {
    padding: 0.35em 0.6em;
    color: #1e293b;
    cursor: pointer;
    transition: 0.15s ease;
    font-weight: 500;
    font-size: 0.8rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
  }

  .nav-btn:hover {
    background: rgba(59, 130, 246, 0.15);
    border-radius: 0.35rem;
    color: #2563eb;
  }

  /* Qué incluye - primer botón */
  .nav-btn:nth-child(1):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 2 8 73.3 8 10.7;
  }

  /* Agradecimiento - segundo botón */
  .nav-btn:nth-child(2):hover ~ svg .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 24.5 8.5 27.5 8.5 55.5;
  }

  .nav-btn:hover ~ .outline .rect {
    stroke-dashoffset: 0;
    stroke-dasharray: 0 0 10 40 10 40;
    transition: 0.5s !important;
  }
`;

const StyledUserDropdown = styled.div`
  .dropdown-container {
    position: relative;
  }

  .dropdown-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #4FB6BE 0%, #3a9ba3 100%);
    color: white;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 500;
    font-size: 0.875rem;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(79, 182, 190, 0.3);
  }

  .dropdown-button:hover {
    background: linear-gradient(135deg, #3a9ba3 0%, #2d7a80 100%);
    box-shadow: 0 4px 12px rgba(79, 182, 190, 0.4);
    transform: translateY(-1px);
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    min-width: 200px;
    overflow: hidden;
    z-index: 50;
    border: 1px solid #e5e7eb;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    color: #374151;
    text-decoration: none;
    transition: all 0.15s ease;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .dropdown-item:hover {
    background: #f3f4f6;
  }

  .dropdown-divider {
    height: 1px;
    background: #e5e7eb;
    margin: 0.25rem 0;
  }

  .user-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #EBBA68 0%, #d4a556 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    color: #014471;
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { afiliado, isAuthenticated, logout, isLoading } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await logout();
  };

  const getUserInitials = () => {
    if (!afiliado) return 'U';
    const firstInitial = afiliado.nombre?.charAt(0).toUpperCase() || '';
    const lastInitial = afiliado.apellido?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  };

  // No mostrar header si es administrador (después de todos los hooks)
  if (afiliado?.isAdmin) {
    return null;
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between gap-8">
          
          {/* Navegación Izquierda con Bordes Animados */}
          <div className="hidden lg:block flex-shrink-0">
            <StyledNavLeft>
              <div className="nav-wrapper">
                <div className="nav-container">
                  <Link href="/" className="nav-btn">
                    Inicio
                  </Link>
                  <Link href="/tarifas" className="nav-btn">
                    Tarifas
                  </Link>
                  <svg 
                    className="outline" 
                    overflow="visible" 
                    width={160} 
                    height={36} 
                    viewBox="0 0 160 36" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect 
                      className="rect" 
                      pathLength={100} 
                      x={0} 
                      y={0} 
                      width={160} 
                      height={36} 
                      fill="transparent" 
                      strokeWidth={2}
                      rx={8}
                    />
                  </svg>
                </div>
              </div>
            </StyledNavLeft>
          </div>

          {/* Logo Centro */}
          <div className="flex-shrink-0 lg:absolute lg:left-[40%] lg:transform lg:-translate-x-1/2">
            <Link href="/">
              <Image 
                src="/logo_cuidasalud_completo.svg"
                alt="CuidaSalud"
                width={180}
                height={34}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navegación Derecha con Bordes Animados */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <StyledNavRight>
              <div className="nav-wrapper">
                <div className="nav-container">
                  <Link href="/que-incluye" className="nav-btn">
                    Qué incluye
                  </Link>
                  <Link href="/agradecimiento" className="nav-btn">
                    Agradecimiento
                  </Link>
                  <svg 
                    className="outline" 
                    overflow="visible" 
                    width={220} 
                    height={36} 
                    viewBox="0 0 220 36" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect 
                      className="rect" 
                      pathLength={100} 
                      x={0} 
                      y={0} 
                      width={220} 
                      height={36} 
                      fill="transparent" 
                      strokeWidth={2}
                      rx={8}
                    />
                  </svg>
                </div>
              </div>
            </StyledNavRight>

            {/* Usuario Autenticado o Botón Login */}
            {isAuthenticated && afiliado ? (
              <StyledUserDropdown>
                <div className="dropdown-container" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="dropdown-button"
                  >
                    <div className="user-avatar">{getUserInitials()}</div>
                    <span>{afiliado.nombre} {afiliado.apellido}</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isUserMenuOpen && (
                    <div className="dropdown-menu">
                      <Link href="/dashboard" className="dropdown-item">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Mi Perfil
                      </Link>
                      <div className="dropdown-divider" />
                      <button onClick={handleLogout} className="dropdown-item w-full text-left">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Cerrar Sesión
                      </button>
                    </div>
                  )}
                </div>
              </StyledUserDropdown>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg text-sm whitespace-nowrap"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Botón Menú Móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menú Móvil */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/tarifas" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tarifas
              </Link>
              <Link 
                href="/que-incluye" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Qué incluye
              </Link>
              <Link 
                href="/agradecimiento" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Agradecimiento
              </Link>

              {/* Usuario Autenticado o Botón Login - Móvil */}
              {isAuthenticated && afiliado ? (
                <>
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-3 py-2 bg-primary/10 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center font-semibold text-text-primary">
                        {getUserInitials()}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-text-primary text-sm">
                          {afiliado.nombre} {afiliado.apellido}
                        </p>
                        <p className="text-xs text-gray-500">{afiliado.email}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-primary transition-colors font-medium py-2 flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Mi Perfil
                  </Link>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-red-600 hover:text-red-700 transition-colors font-medium py-2 flex items-center gap-2 w-full text-left"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}