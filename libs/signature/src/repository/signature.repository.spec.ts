import { Test, TestingModule } from '@nestjs/testing';
import { SignatureRepository } from './signature.repository';

describe('SignatureRepository', () => {
  let provider: SignatureRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignatureRepository],
    }).compile();

    provider = module.get<SignatureRepository>(SignatureRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
