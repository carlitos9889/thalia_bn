import { Module } from '@nestjs/common';
import { FuentesService } from './fuentes.service';
import { FuentesController } from './fuentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fuente } from './entities/fuente.entity';

@Module({
  controllers: [FuentesController],
  providers: [FuentesService],
  imports: [TypeOrmModule.forFeature([Fuente])],
})
export class FuentesModule {}
