import { TestBed } from '@automock/jest';
import { AuthService } from '../service/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController Unit Test', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(AuthController).compile();

    controller = unit;
    service = unitRef.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
