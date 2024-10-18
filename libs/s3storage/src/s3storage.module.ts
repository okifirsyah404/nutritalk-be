import { DynamicModule, Global, Module } from '@nestjs/common';
import { S3_STORAGE_MODULE_OPTIONS } from './constant/di.key';
import {
  S3StorageAsyncOptions,
  S3StorageOptions,
} from './interface/s3storage.interface';
import { AppS3StorageService } from './provider/app-s3storage.service';
import { S3StorageService } from './provider/s3storage.service';

@Global()
@Module({})
export class S3StorageModule {
  private static readonly providers = [S3StorageService, AppS3StorageService];

  /**
   *
   * Creates a dynamic module for the S3StorageModule with the specified options.
   * @param options - Optional configuration options for the S3StorageModule.
   *
   * @returns { DynamicModule } A dynamic module object.
   *
   */
  static forRoot(options?: S3StorageOptions): DynamicModule {
    return {
      module: S3StorageModule,
      imports: options?.imports || [],
      providers: [
        {
          provide: S3_STORAGE_MODULE_OPTIONS,
          useValue: options,
        },
        ...this.providers,
      ],
      exports: this.providers,
    };
  }

  /**
   *
   * Creates a dynamic module for the S3StorageModule with asynchronous configuration.
   *
   * @param options - An optional object containing configuration options.
   *
   * @returns { DynamicModule } A dynamic module configuration object.
   *
   */
  static forRootAsync(options?: S3StorageAsyncOptions): DynamicModule {
    return {
      module: S3StorageModule,
      imports: options?.imports || [],
      providers: [
        {
          inject: options?.inject || [],
          provide: S3_STORAGE_MODULE_OPTIONS,
          useFactory: async (...args: any[]): Promise<S3StorageOptions> => {
            const result = await options?.useFactory?.(...args);
            return result;
          },
        },
        ...this.providers,
      ],
      exports: this.providers,
    };
  }
}
