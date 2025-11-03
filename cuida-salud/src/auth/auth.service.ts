import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AfiliadosService } from '../afiliados/afiliados.service';
import { LoginDto } from './dto/login.dto';
import { RegistroAfiliadoDto } from './dto/registro-afiliado.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private afiliadosService: AfiliadosService,
    private jwtService: JwtService,
  ) {}

  async registro(registroDto: RegistroAfiliadoDto) {
    const afiliado = await this.afiliadosService.crear(registroDto);

    const payload: JwtPayload = {
      sub: afiliado.id,
      email: afiliado.email,
      roles: afiliado.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      afiliado: {
        id: afiliado.id,
        email: afiliado.email,
        nombre: afiliado.nombre,
        apellido: afiliado.apellido,
        documentoIdentidad: afiliado.documentoIdentidad,
        roles: afiliado.roles,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const afiliado = await this.afiliadosService.buscarPorEmail(email);

    if (!afiliado) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValido = await this.afiliadosService.validarPassword(
      password,
      afiliado.password,
    );

    if (!passwordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub: afiliado._id.toString(),
      email: afiliado.email,
      roles: afiliado.roles,
    };

    return {
      access_token: this.jwtService.sign(payload),
      afiliado: {
        id: afiliado._id.toString(),
        email: afiliado.email,
        nombre: afiliado.nombre,
        apellido: afiliado.apellido,
        documentoIdentidad: afiliado.documentoIdentidad,
        roles: afiliado.roles,
      },
    };
  }
}