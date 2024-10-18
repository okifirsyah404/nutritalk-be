import { TestBed } from '@automock/jest';
import { PrismaService } from '@database/prisma';
import { AppJwtRepository } from './app-jwt.repository';

describe('AppJwtRepository Unit Test', () => {
  let repository: AppJwtRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AppJwtRepository).compile();

    repository = unit;
    prisma = unitRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
