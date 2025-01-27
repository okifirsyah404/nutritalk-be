/* eslint-disable @typescript-eslint/no-unsafe-function-type */

export type ApplyDecorators = <TFunction extends Function, Y>(
	target: TFunction | object,
	propertyKey?: string | symbol,
	descriptor?: TypedPropertyDescriptor<Y>,
) => void;
