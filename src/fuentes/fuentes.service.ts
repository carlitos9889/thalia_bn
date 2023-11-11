import { Injectable } from '@nestjs/common';
import { CreateFuenteDto } from './dto/create-fuente.dto';
import { UpdateFuenteDto } from './dto/update-fuente.dto';

@Injectable()
export class FuentesService {
  create(createFuenteDto: CreateFuenteDto) {
    return 'This action adds a new fuente';
  }

  findAll() {
    return `This action returns all fuentes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fuente`;
  }

  update(id: number, updateFuenteDto: UpdateFuenteDto) {
    return `This action updates a #${id} fuente`;
  }

  remove(id: number) {
    return `This action removes a #${id} fuente`;
  }
}
