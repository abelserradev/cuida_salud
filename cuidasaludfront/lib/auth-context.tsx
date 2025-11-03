'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { AuthContextType, Afiliado, RegistroRequest } from '@/types/auth';
import { loginAction, registroAction, logoutAction, checkAuthAction } from '@/app/actions/auth';

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provider del contexto de autenticación
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [afiliado, setAfiliado] = useState<Afiliado | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Verificar autenticación al cargar
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Obtener afiliado de cookies
   */
  const getAfiliadoFromCookies = (): Afiliado | null => {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const afiliadoCookie = cookies.find((c) =>
      c.trim().startsWith('afiliado_data=')
    );

    if (!afiliadoCookie) return null;

    try {
      const data = afiliadoCookie.split('=')[1];
      return JSON.parse(decodeURIComponent(data));
    } catch {
      return null;
    }
  };

  /**
   * Obtener token de cookies
   */
  const getTokenFromCookies = (): string | null => {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((c) => c.trim().startsWith('auth_token='));

    if (!tokenCookie) return null;

    return tokenCookie.split('=')[1];
  };

  /**
   * Verificar autenticación
   */
  const checkAuth = async () => {
    try {
      setIsLoading(true);

      // Verificar con Server Action
      const result = await checkAuthAction();

      if (result.isAuthenticated && result.afiliado) {
        setAfiliado(result.afiliado);
        setIsAuthenticated(true);
        
        // Intentar obtener token de cookies (aunque es httpOnly, para referencia)
        const clientToken = getTokenFromCookies();
        if (clientToken) {
          setToken(clientToken);
        }
      } else {
        setAfiliado(null);
        setToken(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setAfiliado(null);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Login
   */
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const result = await loginAction({ email, password });

      if (result.success && result.afiliado) {
        setAfiliado(result.afiliado);
        setIsAuthenticated(true);

        // Obtener token de cookies
        const clientToken = getTokenFromCookies();
        if (clientToken) {
          setToken(clientToken);
        }

        // Redirigir según el rol
        const redirectPath = result.afiliado.isAdmin ? '/admin' : '/dashboard';
        router.push(redirectPath);
        router.refresh();
      } else {
        throw new Error(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setAfiliado(null);
      setToken(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Registro
   */
  const registro = async (data: RegistroRequest) => {
    try {
      setIsLoading(true);

      const result = await registroAction(data);

      if (result.success && result.afiliado) {
        setAfiliado(result.afiliado);
        setIsAuthenticated(true);

        // Obtener token de cookies
        const clientToken = getTokenFromCookies();
        if (clientToken) {
          setToken(clientToken);
        }

        // Redirigir al dashboard
        router.push('/dashboard');
        router.refresh();
      } else {
        throw new Error(result.error || 'Error al registrar');
      }
    } catch (error) {
      setAfiliado(null);
      setToken(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout
   */
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Limpiar estado antes de llamar al server action
      setAfiliado(null);
      setToken(null);
      setIsAuthenticated(false);

      // El server action redirige automáticamente
      await logoutAction();
    } catch (error) {
      console.error('Error en logout:', error);
      // Asegurar que se limpie el estado incluso si falla
      setAfiliado(null);
      setToken(null);
      setIsAuthenticated(false);
      router.push('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    afiliado,
    token,
    isAuthenticated,
    isLoading,
    login,
    registro,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook para usar el contexto de autenticación
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}

