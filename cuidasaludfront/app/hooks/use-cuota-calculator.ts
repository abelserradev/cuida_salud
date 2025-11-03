import { useMemo } from 'react';

export interface TarifaInfo {
  rangoEdad: string;
  precio: number;
  edad: number | null;
  esValido: boolean;
}

export function useCuotaCalculator(fechaNacimiento: string): TarifaInfo {
  return useMemo(() => {
    // Validar formato DD-MM-YYYY
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = fechaNacimiento.match(regex);

    if (!match) {
      return {
        rangoEdad: '',
        precio: 0,
        edad: null,
        esValido: false,
      };
    }

    const [, dia, mes, anio] = match;
    const fecha = new Date(
      parseInt(anio, 10),
      parseInt(mes, 10) - 1,
      parseInt(dia, 10)
    );

    // Validar que la fecha sea válida
    if (isNaN(fecha.getTime())) {
      return {
        rangoEdad: '',
        precio: 0,
        edad: null,
        esValido: false,
      };
    }

    // Calcular edad
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes_diff = hoy.getMonth() - fecha.getMonth();
    
    if (mes_diff < 0 || (mes_diff === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    // Validar edad mínima (18 años)
    if (edad < 18) {
      return {
        rangoEdad: 'Menor de 18 años',
        precio: 0,
        edad,
        esValido: false,
      };
    }

    // Determinar rango y precio
    let rangoEdad: string;
    let precio: number;

    if (edad >= 0 && edad <= 50) {
      rangoEdad = 'De 0 a 50 años';
      precio = 15;
    } else if (edad >= 51 && edad <= 70) {
      rangoEdad = 'De 51 a 70 años';
      precio = 20;
    } else if (edad >= 71 && edad <= 90) {
      rangoEdad = 'De 71 a 90 años';
      precio = 25;
    } else {
      rangoEdad = 'De 91 años o más';
      precio = 30;
    }

    return {
      rangoEdad,
      precio,
      edad,
      esValido: true,
    };
  }, [fechaNacimiento]);
}

