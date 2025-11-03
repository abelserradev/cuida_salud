import { ApiProperty } from "@nestjs/swagger";
import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsDateString,
    Matches,
    MinLength,
    MaxLength,
    IsEmail,
} from 'class-validator';

export enum Genero {
    MASCULINO = 'M',
    FEMENINO = 'F',
}

export class CrearAfiliadoDto {
    @ApiProperty({
        description: 'Nombre del afiliado',
        example: 'Juan',
        minLength: 2,
        maxLength: 30,
    })
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'El nombre debe tener al menos 30 caracteres' })
    @Matches(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/, { message: 'El nombre debe contener solo letras' })
    readonly nombre: string;

    @ApiProperty({
        description: 'Apellido del afiliado',
        example: 'Perez',
        minLength: 2,
        maxLength: 10,
    })
    @IsString({ message: 'El apellido debe ser un texto' })
    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    @MaxLength(10, { message: 'El apellido debe tener al menos 10 caracteres' })
    @Matches(/^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/, { message: 'El apellido debe contener solo letras' })
    readonly apellido: string;

    @ApiProperty({
        description: 'Teléfono del afiliado (solo se aceptan números de lineas nacionales)',
        example: '04121234567',
        pattern: '^(0414|0424|0416|0426|0422|0212|0412)',
    })
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^(0414|0424|0416|0426|0422|0212|0412)\d{7}$/, { message: 'El teléfono debe ser un número de línea nacional válido' })
    readonly telefono: string;

    @ApiProperty({
        description: 'Documento de identidad del afiliado (solo cedula de identidad nacionales)',
        example: 'V12345678',
        pattern: '^[Vv]\\d{6,8}$',
    })
    @IsString({ message: 'El documento de identidad debe ser un texto' })
    @IsNotEmpty({ message: 'El documento de identidad es obligatorio' })
    @Matches(/^[Vv]\d{6,8}$/, { message: 'El documento de identidad debe ser una cédula de identidad válida' })
    readonly documentoIdentidad: string;

    @ApiProperty({
        description: 'Género del afiliado',
        enum: Genero,
        example: Genero.MASCULINO,
    })
    @IsEnum(Genero, { message: 'El género debe ser M o F' })
    @IsNotEmpty({ message: 'El género es obligatorio' })
    readonly genero: Genero;

    @ApiProperty({
        description: 'Fecha de nacimiento del afiliado',
        example: '13-11-1998',
        type: String,
        format: 'date',
      })
      @IsString({ message: 'La fecha de nacimiento debe ser un texto' })
      @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
      @Matches(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/, {
        message: 'La fecha de nacimiento debe tener el formato DD-MM-YYYY (ejemplo: 13-11-1998)',
      })
      readonly fechaNacimiento: string;

      @ApiProperty({
        description: 'Email del afiliado',
        example: 'juan.perez@ejemplo.com',
      })
      @IsEmail({}, { message: 'Debe proporcionar un email válido' })
      @IsNotEmpty({ message: 'El email es requerido' })
      email: string;

      @ApiProperty({
        description: 'Contraseña del afiliado',
        example: 'Password123!',
        minLength: 6,
      })
      @IsString()
      @IsNotEmpty({ message: 'La contraseña es requerida' })
      @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
      @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula y un número',
      })
      password: string;
}