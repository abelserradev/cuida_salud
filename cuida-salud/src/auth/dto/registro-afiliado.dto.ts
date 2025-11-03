import { CrearAfiliadoDto } from '../../afiliados/models/dto/crear-afiliado.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CrearAfiliadoDto)
export class RegistroAfiliadoDto extends CrearAfiliadoDto {
}