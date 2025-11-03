'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib/auth-context';
import { registroSchema, type RegistroFormData } from '@/lib/validations/auth-schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCuotaCalculator } from '@/app/hooks/use-cuota-calculator';

export default function RegistroPage() {
  const { registro, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistroFormData>({
    resolver: zodResolver(registroSchema),
    mode: 'onChange',
  });

  // Watch fecha de nacimiento para calcular cuota
  const fechaNacimiento = watch('fechaNacimiento', '');
  const cuotaInfo = useCuotaCalculator(fechaNacimiento);

  const onSubmit = async (data: RegistroFormData) => {
    try {
      setError('');
      await registro(data);
      // La redirección se maneja automáticamente en el hook useAuth
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/logo_cuidasalud_completo.svg"
              alt="CuidaSalud"
              width={200}
              height={38}
              priority
              className="h-12 w-auto mx-auto"
            />
          </Link>
          <h2 className="text-3xl font-bold text-text-primary">
            Únete a CuidaSalud
          </h2>
          <p className="mt-2 text-gray-600">
            Crea tu cuenta y comienza a proteger a tu familia
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Global */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary border-b pb-2">
                Información Personal
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="nombre"
                  type="text"
                  label="Nombre"
                  placeholder="Juan"
                  error={errors.nombre?.message}
                  helperText="Solo letras (2-30 caracteres)"
                  {...register('nombre')}
                  required
                />

                <Input
                  id="apellido"
                  type="text"
                  label="Apellido"
                  placeholder="Pérez"
                  error={errors.apellido?.message}
                  helperText="Solo letras (2-10 caracteres)"
                  {...register('apellido')}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="documentoIdentidad"
                  type="text"
                  label="Cédula de Identidad"
                  placeholder="V12345678"
                  error={errors.documentoIdentidad?.message}
                  helperText="Formato: V12345678"
                  {...register('documentoIdentidad')}
                  required
                />

                <Input
                  id="fechaNacimiento"
                  type="text"
                  label="Fecha de Nacimiento"
                  placeholder="13-11-1998"
                  error={errors.fechaNacimiento?.message}
                  helperText="Formato: DD-MM-YYYY (Debes ser mayor de 18)"
                  {...register('fechaNacimiento')}
                  required
                />
              </div>

              {/* Preview de Cuota Calculada */}
              {fechaNacimiento && cuotaInfo.esValido && (
                <div className="mt-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-xl p-6 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg">
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
                            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-medium">Tu cuota mensual será</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-4xl font-bold text-primary">${cuotaInfo.precio}</span>
                          <span className="text-gray-600 font-medium">USD/mes</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">Edad: {cuotaInfo.edad} años</p>
                      <p className="text-xs text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200">
                        {cuotaInfo.rangoEdad}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-sm text-gray-700">
                        Esta cuota se calculó automáticamente según tu edad. Incluye cobertura completa
                        de urgencias médicas 24/7.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mensaje de Error si es menor de edad */}
              {fechaNacimiento && !cuotaInfo.esValido && cuotaInfo.edad !== null && cuotaInfo.edad < 18 && (
                <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-red-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-red-700">Edad no válida</p>
                      <p className="text-xs text-red-600 mt-1">
                        Debes ser mayor de 18 años para registrarte. Tu edad: {cuotaInfo.edad} años
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="telefono"
                  type="tel"
                  label="Teléfono"
                  placeholder="04141234567"
                  error={errors.telefono?.message}
                  helperText="Líneas venezolanas"
                  {...register('telefono')}
                  required
                />

                <div className="space-y-2">
                  <label
                    htmlFor="genero"
                    className="block text-sm font-medium text-text-primary"
                  >
                    Género <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="genero"
                    {...register('genero')}
                    className={`
                      w-full px-4 py-2.5 rounded-lg border-2 
                      ${
                        errors.genero
                          ? 'border-red-500 focus:border-red-600 focus:ring-red-500/20'
                          : 'border-gray-300 focus:border-primary focus:ring-primary/20'
                      }
                      focus:outline-none focus:ring-4 
                      transition-all duration-200
                      disabled:bg-gray-100 disabled:cursor-not-allowed
                    `}
                  >
                    <option value="">Selecciona...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                  {errors.genero && (
                    <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.genero.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Información de Acceso */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-text-primary border-b pb-2">
                Información de Acceso
              </h3>

              <Input
                id="email"
                type="email"
                label="Correo Electrónico"
                placeholder="tu@email.com"
                error={errors.email?.message}
                {...register('email')}
                required
              />

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Contraseña"
                  placeholder="••••••••"
                  error={errors.password?.message}
                  helperText="Mínimo 6 caracteres, incluye mayúscula, minúscula y número"
                  {...register('password')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-gray-500 hover:text-primary transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      ></path>
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-6"
              isLoading={isSubmitting || isLoading}
            >
              Crear Cuenta
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

