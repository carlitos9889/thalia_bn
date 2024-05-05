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
import { Client } from 'pg';
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
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'db',
      user: 'postgres',
      password: 'my_secret_password',
    });
    await client.connect();
    const query =
      'SELECT id, title, organization, frequency, is_monitoring, editores, materia, url, "ejesTematicos" FROM public.api_fuente';
    try {
      const result = await client.query(query);
      return result.rows;
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

  async allRegisters() {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'db',
      user: 'postgres',
      password: 'my_secret_password',
    });

    try {
      await client.connect();
      const query =
        'SELECT id, header, metadata, dia, mes, anno, fuente_id FROM public.api_registros';
      const result = await client.query(query);
      const resultParse = result.rows.map((r) => {
        r.header = JSON.parse(r.header);
        r.metadata = JSON.parse(r.metadata);
        return r;
      });
      const arrayMeses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      const obj = {};
      arrayMeses.forEach((numMonth) => {
        obj[numMonth] = {
          publisher: [],
          title: [],
          creator: [],
        };
        const rowsByMonth = resultParse
          .filter(
            (result) =>
              result.mes == numMonth &&
              Object.entries(result.metadata).length > 0,
          )
          .map((e) => e.metadata._map)
          .filter((e) => e)
          .map((e) => ({
            publisher: e.publisher,
            title: e.title,
            creator: e.creator,
          }));

        obj[numMonth].publisher = Array.from(
          new Set(...rowsByMonth.map((r) => r.publisher)),
        );
        obj[numMonth].title = Array.from(
          new Set(...rowsByMonth.map((r) => r.title)),
        );
        obj[numMonth].creator = Array.from(
          new Set(...rowsByMonth.map((r) => r.creator)),
        );
      });

      return obj;
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
