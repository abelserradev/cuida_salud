import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AfiliadosController } from './afiliados.controller';
import { AfiliadosService } from './afiliados.service';
import { Afiliado, AfiliadoSchema } from './models/entidades/afiliado.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Afiliado.name, schema: AfiliadoSchema },
    ]),
  ],
  controllers: [AfiliadosController],
  providers: [AfiliadosService],
  exports: [AfiliadosService],
})
export class AfiliadosModule {}
