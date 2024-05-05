import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FuentesService } from './fuentes.service';
import { CreateFuenteDto } from './dto/create-fuente.dto';
import { UpdateFuenteDto } from './dto/update-fuente.dto';

@Controller('fuentes')
export class FuentesController {
  constructor(private readonly fuentesService: FuentesService) {}

  @Post('create-fuente')
  create(@Body() createFuenteDto: CreateFuenteDto) {
    return this.fuentesService.create(createFuenteDto);
  }

  @Get('get-all-fuentes')
  async findAll() {
    return this.fuentesService.findAll();
  }

  @Get('get-all-registers')
  allRegisters() {
    return this.fuentesService.allRegisters();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fuentesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFuenteDto: UpdateFuenteDto) {
    return this.fuentesService.update(id, updateFuenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fuentesService.remove(id);
  }
}
