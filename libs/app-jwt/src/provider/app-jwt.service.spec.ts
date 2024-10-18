import { TestBed } from '@automock/jest';
import { AppJwtRepository } from '../repository/app-jwt.repository';
import { AppJwtService } from './app-jwt.service';

describe('AppJwtService Unit Test', () => {
  let service: AppJwtService;
  let repository: jest.Mocked<AppJwtRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AppJwtService).compile();

    service = unit;
    repository = unitRef.get(AppJwtRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
