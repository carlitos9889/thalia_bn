import { Test, TestingModule } from '@nestjs/testing';
import { FuentesService } from './fuentes.service';

describe('FuentesService', () => {
  let service: FuentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuentesService],
    }).compile();

    service = module.get<FuentesService>(FuentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
