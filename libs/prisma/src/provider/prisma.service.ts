import { AppConfigService } from '@config/app-config';
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PRISMA_MODULE_OPTIONS } from '../constant/di.key';
import { PrismaModuleOptions } from '../interface/prisma.interface';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(
    private readonly appConfig: AppConfigService,
    @Inject(PRISMA_MODULE_OPTIONS)
    private readonly options?: PrismaModuleOptions,
  ) {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });

    this._databaseLogging();
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log(`Prisma connected to ${this.appConfig.databaseConfig.url}`);
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }

  private _databaseLogging(): void {
    if (this.options?.logs) {
      this.$on('query', (e) => {
        this.logger.verbose(e.query, e.params);
      });
    }
  }
}
