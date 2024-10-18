import { TestBed } from '@automock/jest';
import { PrismaService } from '@database/prisma';
import { SignatureRepository } from './signature.repository';

describe('SignatureRepository Unit Test', () => {
  let repository: SignatureRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(SignatureRepository).compile();

    repository = unit;
    prisma = unitRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
