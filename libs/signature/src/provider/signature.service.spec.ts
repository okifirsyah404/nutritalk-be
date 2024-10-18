import { TestBed } from '@automock/jest';
import { SignatureRepository } from '../repository/signature.repository';
import { SignatureService } from './signature.service';

describe('SignatureService Unit Test', () => {
  let service: SignatureService;
  let repository: jest.Mocked<SignatureRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(SignatureService).compile();

    service = unit;
    repository = unitRef.get(SignatureRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
