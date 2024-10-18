import { Test, TestingModule } from '@nestjs/testing';
import { ProfileRepository } from './profile.repository';

describe('ProfileRepository', () => {
  let provider: ProfileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileRepository],
    }).compile();

    provider = module.get<ProfileRepository>(ProfileRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
