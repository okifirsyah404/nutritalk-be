import { INutritionist, IPatient } from '@database/prisma';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';

const GetNutritionistLogged = createParamDecorator(
  (data, ctx: ExecutionContext): INutritionist => {
    const user: INutritionist | IPatient = ctx.switchToHttp().getRequest().user;

    if (!isNutritionist(user)) {
      throw new Error('User is not a nutritionist');
    }

    return user as INutritionist;
  },
);

function isNutritionist(user: INutritionist | IPatient): user is INutritionist {
  return (user as INutritionist).account.role === Role.NUTRITIONIST;
}

export default GetNutritionistLogged;
