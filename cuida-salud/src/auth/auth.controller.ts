import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistroAfiliadoDto } from './dto/registro-afiliado.dto';
import { Public } from './decorators/public.decorator';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('registro')
  @ApiOperation({ summary: 'Registrar nuevo afiliado' })
  @ApiResponse({
    status: 201,
    description: 'Afiliado registrado exitosamente',
  })
  @ApiResponse({
    status: 409,
    description: 'El email o documento ya está registrado',
  })
  async registro(@Body() registroDto: RegistroAfiliadoDto) {
    return this.authService.registro(registroDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}