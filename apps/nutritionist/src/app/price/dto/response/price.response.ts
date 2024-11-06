import { IPriceEntity } from '@database/prisma';

export class PriceResponse implements IPriceEntity {
  id: string;
  online: number;
  offline: number;

  private constructor(price: IPriceEntity) {
    this.id = price.id;
    this.online = price.online;
    this.offline = price.offline;
  }

  static fromEntity(price: IPriceEntity): PriceResponse {
    return new PriceResponse(price);
  }

  static readonly exampleData: PriceResponse = {
    id: 'cm32r86wi000b3vptrq0792sp',
    online: 100_000,
    offline: 200_000,
  };
}
