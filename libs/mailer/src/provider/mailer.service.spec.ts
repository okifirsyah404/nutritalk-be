import { TestBed } from '@automock/jest';
import { MAILER_MODULE_OPTIONS } from '../constant/di.key';
import { MailerOptions } from '../interface/mailer.interface';
import { MailerService } from './mailer.service';

describe('MailerService Unit Test', () => {
  let service: MailerService;
  let options: jest.Mocked<MailerOptions>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(MailerService).compile();

    service = unit;
    options = unitRef.get(MAILER_MODULE_OPTIONS);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(options).toBeDefined();
  });
});
