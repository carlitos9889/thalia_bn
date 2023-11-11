import { PartialType } from '@nestjs/mapped-types';
import { CreateFuenteDto } from './create-fuente.dto';

export class UpdateFuenteDto extends PartialType(CreateFuenteDto) {}
