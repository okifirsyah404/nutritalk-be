/* eslint-disable @typescript-eslint/ban-types */
export type ApplyDecorators = <TFunction extends Function, Y>(
  target: TFunction | object,
  propertyKey?: string | symbol,
  descriptor?: TypedPropertyDescriptor<Y>,
) => void;
