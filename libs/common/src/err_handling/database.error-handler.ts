/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseErrorMessage } from '../constant/message/error/database-error.message';

export function createDatabaseErrorHandler(err: any): PromiseLike<never> {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        throw new UnprocessableEntityException(
          DatabaseErrorMessage.ERR_DATABASE_UNIQUE_CONSTRAINT,
        );
      default:
        throw new UnprocessableEntityException(
          DatabaseErrorMessage.ERR_DATABASE,
        );
    }
  }

  throw new InternalServerErrorException(DatabaseErrorMessage.ERR_DATABASE);
}
