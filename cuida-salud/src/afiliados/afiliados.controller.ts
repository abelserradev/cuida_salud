import { Controller,Post,Get,Body,Param,HttpCode,HttpStatus } from '@nestjs/common';
import { ApiTags,ApiOperation,ApiResponse,ApiParam,ApiBody } from '@nestjs/swagger';
import { AfiliadosService } from './afiliados.service';
import { CrearAfiliadoDto } from './models/dto/crear-afiliado.dto';
import { AfiliadoRespuestaDto } from './models/dto/afiliado-respuesta.dto';
import { Public } from 'src/auth/decorators/public.decorator';
  

@ApiTags('Afiliados')
@Controller('afiliados')
export class AfiliadosController {
    constructor(private readonly afiliadosService: AfiliadosService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({
        summary: 'Registrar un nuevo afiliado',
        description: 'Crea un nuevo afiliado con validacion de datos unicos'
    })
    @ApiBody({ type: CrearAfiliadoDto})
    @ApiResponse({
        status: 201,
        description: 'Afiliado creado exitosamente',
        type: AfiliadoRespuestaDto,
      })
    @ApiResponse({
        status: 400,
        description: 'Datos de entrada inválidos',
      })
    @ApiResponse({
        status: 409,
        description: 'El documento de identidad ya existe',
      })
      async crear(
    @Body() crearAfiliadoDto: CrearAfiliadoDto,
      ): Promise<AfiliadoRespuestaDto> {
        return await this.afiliadosService.crear(crearAfiliadoDto);
      }

    @Public()
    @Get()
    @ApiOperation({
        summary: 'Listar todos los afiliados',
        description: 'Obtiene una lista de todos los afiliados registrados',
      })
    @ApiResponse({
        status: 200,
        description: 'Lista de afiliados obtenida exitosamente',
        type: [AfiliadoRespuestaDto],
      })
      async obtenerTodos(): Promise<AfiliadoRespuestaDto[]> {
        return await this.afiliadosService.obtenerTodos();
      }
    
      @Get(':id')
      @ApiOperation({
        summary: 'Obtener afiliado por ID',
        description: 'Obtiene los detalles de un afiliado específico',
      })
      @ApiParam({
        name: 'id',
        description: 'ID del afiliado',
        example: '507f1f77bcf86cd799439011',
      })
      @ApiResponse({
        status: 200,
        description: 'Afiliado encontrado',
        type: AfiliadoRespuestaDto,
      })
      @ApiResponse({
        status: 404,
        description: 'Afiliado no encontrado',
      })
      async obtenerPorId(@Param('id') id: string): Promise<AfiliadoRespuestaDto> {
        return await this.afiliadosService.obtenerPorId(id);
      }

}
