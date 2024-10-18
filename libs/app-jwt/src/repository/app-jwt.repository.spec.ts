import { Test, TestingModule } from '@nestjs/testing';
import { AppJwtRepository } from './app-jwt.repository';

describe('AppJwtRepository', () => {
  let provider: AppJwtRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppJwtRepository],
    }).compile();

    provider = module.get<AppJwtRepository>(AppJwtRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
