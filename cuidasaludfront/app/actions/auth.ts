'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { LoginRequest, RegistroRequest, AuthResponse, ApiError } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4200';


export async function loginAction(data: LoginRequest) {
  try {
    // Verificar si es el administrador hardcoded
    if (data.email === 'cuida@salud.com' && data.password === 'cuidasalud1') {
      const adminData = {
        access_token: 'admin_token_hardcoded',
        afiliado: {
          id: 'admin-001',
          email: 'cuida@salud.com',
          nombre: 'ADMINISTRADOR',
          apellido: '',
          documentoIdentidad: 'ADMIN',
          roles: ['admin'],
          isAdmin: true,
        },
      };

      const cookieStore = await cookies();
      cookieStore.set('auth_token', adminData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      cookieStore.set(
        'afiliado_data',
        JSON.stringify(adminData.afiliado),
        {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        }
      );

      return {
        success: true,
        afiliado: adminData.afiliado,
      };
    }

    // Si no es admin, proceder con la API normal
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: 'Error desconocido',
        statusCode: response.status,
      }));

      return {
        success: false,
        error: errorData.message || 'Credenciales inválidas',
      };
    }

    const authData: AuthResponse = await response.json();


    const cookieStore = await cookies();
    cookieStore.set('auth_token', authData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, 
      path: '/',
    });

 
    cookieStore.set(
      'afiliado_data',
      JSON.stringify({
        id: authData.afiliado.id,
        email: authData.afiliado.email,
        nombre: authData.afiliado.nombre,
        apellido: authData.afiliado.apellido,
        roles: authData.afiliado.roles,
      }),
      {
        httpOnly: false, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      }
    );

    return {
      success: true,
      afiliado: authData.afiliado,
    };
  } catch (error) {
    console.error('Error en loginAction:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.',
    };
  }
}


export async function registroAction(data: RegistroRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        message: 'Error desconocido',
        statusCode: response.status,
      }));

      if (response.status === 409) {
        return {
          success: false,
          error: 'El email o documento ya está registrado',
        };
      }

      return {
        success: false,
        error: errorData.message || 'Error al registrar el afiliado',
      };
    }

    const authData: AuthResponse = await response.json();

    const cookieStore = await cookies();
    cookieStore.set('auth_token', authData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

   
    cookieStore.set(
      'afiliado_data',
      JSON.stringify({
        id: authData.afiliado.id,
        email: authData.afiliado.email,
        nombre: authData.afiliado.nombre,
        apellido: authData.afiliado.apellido,
        roles: authData.afiliado.roles,
      }),
      {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      }
    );

    return {
      success: true,
      afiliado: authData.afiliado,
    };
  } catch (error) {
    console.error('Error en registroAction:', error);
    return {
      success: false,
      error: 'Error de conexión. Intenta nuevamente.',
    };
  }
}


export async function logoutAction() {
  const cookieStore = await cookies();
  

  cookieStore.delete('auth_token');
  cookieStore.delete('afiliado_data');

  redirect('/login');
}


export async function checkAuthAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');
    const afiliadoData = cookieStore.get('afiliado_data');

    if (!token || !afiliadoData) {
      return {
        isAuthenticated: false,
        afiliado: null,
      };
    }

    return {
      isAuthenticated: true,
      afiliado: JSON.parse(afiliadoData.value),
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      afiliado: null,
    };
  }
}


export async function getServerToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');
  return token?.value || null;
}

/**
 * Obtener todos los afiliados (solo para admin)
 */
export async function obtenerAfiliadosAction() {
  try {
    const token = await getServerToken();

    if (!token) {
      return {
        success: false,
        error: 'No autenticado',
        afiliados: [],
      };
    }

    const response = await fetch(`${API_BASE_URL}/afiliados`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Error al obtener afiliados',
        afiliados: [],
      };
    }

    const afiliados = await response.json();

    return {
      success: true,
      afiliados,
    };
  } catch (error) {
    console.error('Error en obtenerAfiliadosAction:', error);
    return {
      success: false,
      error: 'Error de conexión',
      afiliados: [],
    };
  }
}

/**
 * Desactivar/Activar afiliado
 */
export async function toggleAfiliadoEstadoAction(afiliadoId: string, activo: boolean) {
  try {
    const token = await getServerToken();

    if (!token) {
      return {
        success: false,
        error: 'No autenticado',
      };
    }

    const response = await fetch(`${API_BASE_URL}/afiliados/${afiliadoId}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ activo }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Error al actualizar estado',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error en toggleAfiliadoEstadoAction:', error);
    return {
      success: false,
      error: 'Error de conexión',
    };
  }
}

/**
 * Eliminar afiliado
 */
export async function eliminarAfiliadoAction(afiliadoId: string) {
  try {
    const token = await getServerToken();

    if (!token) {
      return {
        success: false,
        error: 'No autenticado',
      };
    }

    const response = await fetch(`${API_BASE_URL}/afiliados/${afiliadoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: 'Error al eliminar afiliado',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error en eliminarAfiliadoAction:', error);
    return {
      success: false,
      error: 'Error de conexión',
    };
  }
}
