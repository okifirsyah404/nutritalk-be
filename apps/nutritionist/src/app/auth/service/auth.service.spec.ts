import { TestBed } from '@automock/jest';
import { AppConfigService } from '@config/app-config';
import { AppJwtService } from '@jwt/app-jwt';
import { AuthRepository } from '../repository/auth.repository';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let config: AppConfigService;
  let repository: AuthRepository;
  let appJwtService: AppJwtService;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AuthService).compile();

    service = unit;
    config = unitRef.get(AppConfigService);
    repository = unitRef.get(AuthRepository);
    appJwtService = unitRef.get(AppJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(config).toBeDefined();
    expect(repository).toBeDefined();
    expect(appJwtService).toBeDefined();
  });
});
