import { z } from 'zod';

// Regex patterns
const TELEFONO_REGEX = /^(0414|0424|0416|0426|0422|0212|0412)\d{7}$/;
const DOCUMENTO_REGEX = /^[Vv]\d{6,8}$/;
const FECHA_REGEX = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
const PASSWORD_MAYUSCULA = /[A-Z]/;
const PASSWORD_MINUSCULA = /[a-z]/;
const PASSWORD_NUMERO = /\d/;
const SOLO_LETRAS = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]+$/;

// Schema de Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

// Schema de Registro
export const registroSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(30, 'El nombre no puede exceder 30 caracteres')
    .regex(SOLO_LETRAS, 'El nombre solo puede contener letras'),
  
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(10, 'El apellido no puede exceder 10 caracteres')
    .regex(SOLO_LETRAS, 'El apellido solo puede contener letras'),
  
  telefono: z
    .string()
    .regex(
      TELEFONO_REGEX,
      'Teléfono inválido. Formato: 0414XXXXXXX (líneas venezolanas)'
    ),
  
  documentoIdentidad: z
    .string()
    .regex(
      DOCUMENTO_REGEX,
      'Documento inválido. Formato: V12345678'
    ),
  
  genero: z
    .enum(['M', 'F'], {
      errorMap: () => ({ message: 'Selecciona un género válido' }),
    }),
  
  fechaNacimiento: z
    .string()
    .regex(
      FECHA_REGEX,
      'Fecha inválida. Formato: DD-MM-YYYY (ejemplo: 13-11-1998)'
    )
    .refine((fecha) => {
      // Validar que sea una fecha real
      const [dia, mes, año] = fecha.split('-').map(Number);
      const date = new Date(año, mes - 1, dia);
      return (
        date.getDate() === dia &&
        date.getMonth() === mes - 1 &&
        date.getFullYear() === año
      );
    }, 'La fecha no es válida')
    .refine((fecha) => {
      // Validar que sea mayor de edad (18 años)
      const [dia, mes, año] = fecha.split('-').map(Number);
      const fechaNac = new Date(año, mes - 1, dia);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fechaNac.getFullYear();
      const mesActual = hoy.getMonth();
      const diaActual = hoy.getDate();
      
      if (mesActual < mes - 1 || (mesActual === mes - 1 && diaActual < dia)) {
        return edad - 1 >= 18;
      }
      return edad >= 18;
    }, 'Debes ser mayor de 18 años'),
  
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(
      PASSWORD_MAYUSCULA,
      'La contraseña debe contener al menos una mayúscula'
    )
    .regex(
      PASSWORD_MINUSCULA,
      'La contraseña debe contener al menos una minúscula'
    )
    .regex(
      PASSWORD_NUMERO,
      'La contraseña debe contener al menos un número'
    ),
});

// Tipos inferidos de los schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegistroFormData = z.infer<typeof registroSchema>;

