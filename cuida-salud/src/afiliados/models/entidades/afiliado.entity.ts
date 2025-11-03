import { Genero } from "../dto/crear-afiliado.dto";
import { HydratedDocument } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type AfiliadoDocument = HydratedDocument<Afiliado>;

@Schema({
    timestamps: { createdAt: 'fechaCreacion', updatedAt: 'fechaActualizacion'}, // Corregido typo
    collection: 'afiliados',
})
export class Afiliado {
    @Prop({ required: true, trim: true })
    nombre: string;

    @Prop({ required: true, trim: true })
    apellido: string;

    @Prop({ required: true, trim: true })
    telefono: string;

    @Prop({ required: true, trim: true, uppercase: true })
    documentoIdentidad: string;
    
    @Prop({ required: true, enum: Genero })
    genero: Genero;

    @Prop({ required: true, type: Date })
    fechaNacimiento: Date;

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: true })
    activo: boolean; // Cambiado de 'estado' a 'activo' para consistencia

    @Prop({ type: [String], default: ['afiliado']})
    roles: string[];

    fechaCreacion: Date;
    fechaActualizacion: Date;
}

export const AfiliadoSchema = SchemaFactory.createForClass(Afiliado);

AfiliadoSchema.index({ documentoIdentidad: 1 }, { unique: true });
AfiliadoSchema.index({ fechaCreacion: -1 });