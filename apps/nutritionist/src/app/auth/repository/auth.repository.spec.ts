import { TestBed } from '@automock/jest';
import { PrismaService } from '@database/prisma';
import { AuthRepository } from './auth.repository';

describe('AuthRepository Unit Test', () => {
  let repository: AuthRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AuthRepository).compile();

    repository = unit;
    prisma = unitRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
