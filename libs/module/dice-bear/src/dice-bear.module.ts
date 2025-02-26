import { DynamicModule, Module } from "@nestjs/common";
import { DiceBearService } from "./provider/dice-bear.service";
import { DiceBearOptions } from "@contract";
import { DICE_BEAR_OPTION } from "@module/dice-bear/constant/di.key";

@Module({})
export class DiceBearModule {
	static forRoot(options?: DiceBearOptions): DynamicModule {
		return {
			module: DiceBearModule,
			imports: options?.imports || [],
			providers: [
				{
					provide: DICE_BEAR_OPTION,
					useValue: options,
				},
				DiceBearService,
			],
			exports: [DiceBearService],
		};
	}
}
