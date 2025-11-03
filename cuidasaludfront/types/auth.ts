// Tipos de autenticación para CuidaSalud

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistroRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  documentoIdentidad: string;
  genero: 'M' | 'F';
  fechaNacimiento: string; // DD-MM-YYYY
  email: string;
  password: string;
}

export interface Afiliado {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  documentoIdentidad: string;
  roles: string[];
  isAdmin?: boolean;
}

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  telefono: string;
  documentoIdentidad: string;
  genero: 'M' | 'F';
  fechaNacimiento: string;       // ISO Date format
  fechaCreacion: string;          // ISO Date format (no createdAt)
  email: string;
  activo: boolean;
  roles: string[];
}

export interface AuthResponse {
  access_token: string;
  afiliado: Afiliado;
}

export interface AuthState {
  afiliado: Afiliado | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  registro: (data: RegistroRequest) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

