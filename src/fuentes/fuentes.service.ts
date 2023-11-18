import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFuenteDto } from './dto/create-fuente.dto';
import { UpdateFuenteDto } from './dto/update-fuente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fuente } from './entities/fuente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FuentesService {
  constructor(
    @InjectRepository(Fuente)
    private readonly fuenteRepository: Repository<Fuente>,
  ) {}
  async create(createFuenteDto: CreateFuenteDto) {
    try {
      const { editores } = createFuenteDto;
      const regex = /[^A-Za-z ]/;
      if (regex.test(editores)) {
        throw new BadRequestException(
          'El nombre del editor no puede conteneter caracteres especiales',
        );
      }
      const fuente = this.fuenteRepository.create({
        ...createFuenteDto,
      });
      await this.fuenteRepository.save(fuente);
      return fuente;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findAll() {
    try {
      const fuentes = await this.fuenteRepository.find();
      return fuentes;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async findOne(id: string) {
    try {
      const fuente = await this.fuenteRepository.findBy({ id });
      return fuente;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async update(id: string, updateFuenteDto: UpdateFuenteDto) {
    try {
      const fuente = await this.fuenteRepository.preload({
        id,
        ...updateFuenteDto,
      });
      if (!fuente) throw new NotFoundException(`No existe fuente id: ${id}`);
      await this.fuenteRepository.save(fuente);
      return fuente;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async remove(id: string) {
    try {
      const fuente = await this.fuenteRepository.findBy({ id });
      if (!fuente) throw new NotFoundException(`No existe fuente id: ${id}`);
      await this.fuenteRepository.delete(id);
      return fuente;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  private handleDBError(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException(error);
  }
}
