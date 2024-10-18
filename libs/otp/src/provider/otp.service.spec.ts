import { TestBed } from '@automock/jest';
import { PrismaService } from '@database/prisma';
import { OtpService } from './otp.service';

describe('OtpService Unit Test', () => {
  let service: OtpService;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(OtpService).compile();

    service = unit;
    prisma = unitRef.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });
});
