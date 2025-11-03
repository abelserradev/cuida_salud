import { CrearAfiliadoDto } from './models/dto/crear-afiliado.dto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Afiliado, AfiliadoDocument } from './models/entidades/afiliado.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AfiliadoRespuestaDto } from './models/dto/afiliado-respuesta.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AfiliadosService {
  constructor(
    @InjectModel(Afiliado.name)
    private readonly afiliadoModel: Model<Afiliado>,
  ) {}

  private async verificarEmailUnico(email: string): Promise<boolean> {
    const afiliado = await this.afiliadoModel
      .findOne({ email: email.toLowerCase() })
      .exec();
  
    return !!afiliado;
  }


  async crear(
    crearAfiliadoDto: CrearAfiliadoDto,
  ): Promise<AfiliadoRespuestaDto> {
    const documentoExistente = await this.verificarDocumentoUnico(
      crearAfiliadoDto.documentoIdentidad,
    );
  
    if (documentoExistente) {
      throw new ConflictException(
        'Ya existe un afiliado con este documento de identidad',
      );
    }

    const emailExistente = await this.verificarEmailUnico(
      crearAfiliadoDto.email,
    );
  
    if (emailExistente) {
      throw new ConflictException(
        'Ya existe un afiliado con este email',
      );
    }
  

    const fechaConvertida = this.convertirFechaStringADate(
      crearAfiliadoDto.fechaNacimiento,
    );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(crearAfiliadoDto.password, salt);

    const nuevoAfiliado = new this.afiliadoModel({
      ...crearAfiliadoDto,
      documentoIdentidad: crearAfiliadoDto.documentoIdentidad.toUpperCase(),
      fechaNacimiento: fechaConvertida,
      password: hashedPassword,
    });

    const afiliadoGuardado = await nuevoAfiliado.save();

    return this.mapearAfiliadoARespuesta(afiliadoGuardado);
  }


  async obtenerTodos(): Promise<AfiliadoRespuestaDto[]> {
    const afiliados = await this.afiliadoModel
      .find()
      .sort({ fechaCreacion: -1 })
      .exec();

    return afiliados.map((afiliado) =>
      this.mapearAfiliadoARespuesta(afiliado),
    );
  }


  async obtenerPorId(id: string): Promise<AfiliadoRespuestaDto> {
    const afiliado = await this.afiliadoModel.findById(id).exec();

    if (!afiliado) {
      throw new NotFoundException(`Afiliado con ID ${id} no encontrado`);
    }

    return this.mapearAfiliadoARespuesta(afiliado);
  }

  async buscarPorEmail(email: string): Promise<AfiliadoDocument | null> {
    return this.afiliadoModel.findOne({ email: email.toLowerCase(), activo: true });
  }
  
  async buscarPorIdCompleto(id: string): Promise<AfiliadoDocument> {
    const afiliado = await this.afiliadoModel.findById(id);
    if (!afiliado) {
      throw new NotFoundException('Afiliado no encontrado');
    }
    return afiliado;
  }
  
  async validarPassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async verificarDocumentoUnico(
    documentoIdentidad: string,
  ): Promise<boolean> {
    const afiliado = await this.afiliadoModel
      .findOne({ documentoIdentidad: documentoIdentidad.toUpperCase() })
      .exec();

    return !!afiliado;
  }

  private convertirFechaStringADate(fechaString: string): Date {
    const [dia, mes, anio] = fechaString.split('-');
    return new Date(parseInt(anio), parseInt(mes) - 1, parseInt(dia));
  }


  private mapearAfiliadoARespuesta(afiliado: AfiliadoDocument): AfiliadoRespuestaDto {
    return {
      id: afiliado._id.toString(),
      nombre: afiliado.nombre,
      apellido: afiliado.apellido,
      telefono: afiliado.telefono,
      documentoIdentidad: afiliado.documentoIdentidad,
      genero: afiliado.genero,
      fechaNacimiento: afiliado.fechaNacimiento,
      fechaCreacion: afiliado.fechaCreacion,
      email: afiliado.email,
      activo: afiliado.activo,
      roles: afiliado.roles,
    };
  }
}