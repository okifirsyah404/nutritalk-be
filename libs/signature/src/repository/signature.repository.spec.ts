/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { TestBed } from '@automock/jest';
import { ISignature, PrismaService } from '@database/prisma';
import { SignatureRepository } from './signature.repository';

describe('SignatureRepository Unit Test', () => {
  let repository: SignatureRepository;
  let prisma: jest.Mocked<PrismaService>;

  const mockData: ISignature = {
    id: '1',
    signature: 'secretSignature',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(SignatureRepository)
      .mock(PrismaService)
      .using({
        signature: {
          findUnique: async (signature: string) => {
            return signature === mockData.signature ? mockData : null;
          },
          create: async (signature: string) => mockData,
          delete: async (signature: string) => mockData,
        },
      })
      .compile();

    repository = unit;
    prisma = unitRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
