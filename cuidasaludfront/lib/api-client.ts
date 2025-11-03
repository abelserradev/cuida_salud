import type { LoginRequest, RegistroRequest, AuthResponse, ApiError } from '@/types/auth';

// Base URL de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Cliente API con manejo automático de tokens y errores
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Método genérico para hacer requests
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Si la respuesta no es ok, lanzar error
      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          message: 'Error desconocido',
          statusCode: response.status,
        }));

        throw {
          message: errorData.message || 'Error en la solicitud',
          statusCode: response.status,
          error: errorData.error,
        } as ApiError;
      }

      // Parsear respuesta JSON
      return await response.json();
    } catch (error) {
      // Si es un error de red o parsing
      if (error instanceof TypeError) {
        throw {
          message: 'Error de conexión. Verifica tu conexión a internet.',
          statusCode: 0,
        } as ApiError;
      }

      // Re-lanzar el error de API
      throw error;
    }
  }

  /**
   * Método con autenticación (incluye token)
   */
  private async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Intentar obtener el token de cookies (client-side)
    const token = this.getTokenFromCookies();

    const config: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    return this.request<T>(endpoint, config);
  }

  /**
   * Obtener token de cookies (client-side)
   */
  private getTokenFromCookies(): string | null {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((c) => c.trim().startsWith('auth_token='));

    if (!tokenCookie) return null;

    return tokenCookie.split('=')[1];
  }

  /**
   * Login de afiliado
   */
  async loginAfiliado(data: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Registro de afiliado
   */
  async registrarAfiliado(data: RegistroRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>('/auth/registro', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Verificar token (endpoint protegido de ejemplo)
   */
  async verificarToken(): Promise<{ valid: boolean; afiliado?: any }> {
    return this.authenticatedRequest('/auth/verify', {
      method: 'GET',
    });
  }

  /**
   * Obtener perfil del afiliado actual
   */
  async obtenerPerfil(): Promise<any> {
    return this.authenticatedRequest('/afiliados/perfil', {
      method: 'GET',
    });
  }
}

// Exportar instancia única del cliente
export const apiClient = new ApiClient();

// Exportar también la clase para casos de uso específicos
export default ApiClient;

