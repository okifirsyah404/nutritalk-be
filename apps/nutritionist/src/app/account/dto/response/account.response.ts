import { IAccountEntity } from '@database/prisma';
import { Role } from '@prisma/client';

export class AccountResponse implements IAccountEntity {
  private constructor(account: IAccountEntity) {
    this.id = account.id;
    this.email = account.email;
    this.role = account.role;
    this.googleId = account.googleId;
    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
  }
  id: string;
  email: string;
  role: Role;
  googleId: string;
  createdAt?: Date;
  updatedAt?: Date;

  public static fromEntity(account: IAccountEntity): AccountResponse {
    return new AccountResponse(account);
  }

  static readonly exampleData: AccountResponse = {
    id: 'cm32r86wi000b3vptrq0792sp',
    email: 'johndoe@example.com',
    role: Role.NUTRITIONIST,
    googleId: '1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
