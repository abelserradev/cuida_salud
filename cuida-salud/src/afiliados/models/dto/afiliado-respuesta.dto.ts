import { ApiProperty } from '@nestjs/swagger';
import { Genero } from './crear-afiliado.dto';

export class AfiliadoRespuestaDto {
  @ApiProperty({
    description: 'ID del afiliado',
    example: '507f1f77bcf86cd799439011',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Nombre del afiliado',
    example: 'Juan',
  })
  readonly nombre: string;

  @ApiProperty({
    description: 'Apellido del afiliado',
    example: 'Pérez',
  })
  readonly apellido: string;

  @ApiProperty({
    description: 'Teléfono del afiliado',
    example: '04241234567',
  })
  readonly telefono: string;

  @ApiProperty({
    description: 'Documento de identidad del afiliado',
    example: 'V12345678',
  })
  readonly documentoIdentidad: string;

  @ApiProperty({
    description: 'Género del afiliado',
    enum: Genero,
    example: Genero.MASCULINO,
  })
  readonly genero: Genero;

  @ApiProperty({
    description: 'Fecha de nacimiento del afiliado',
    example: '13-11-1990',
  })
  readonly fechaNacimiento: Date;

  @ApiProperty({
    description: 'Fecha de creación del registro',
    example: '01-11-2025T10:30:00.000Z',
  })
  readonly fechaCreacion: Date;

  @ApiProperty({
    description: 'Email del afiliado',
    example: 'juan.perez@ejemplo.com',
  })
  readonly email: string;

  @ApiProperty({
    description: 'Estatus del afiliado',
    example: true,
  })
  readonly activo: boolean;

  @ApiProperty({
    description: 'Roles del afiliado',
    example: ['afiliado', 'admin'],
  })
  readonly roles: string[];



  
}