import { QueueKeyConstant } from "@constant/key";
import { BullModule } from "@nestjs/bull";
import { Global, Module } from "@nestjs/common";
import { MailQueueProcessor } from "./processor/mail-queue.processor";
import { MailQueueService } from "./service/mail-queue.service";
import { DiceBearQueueProcessor } from "@app/module/queue/processor/dice-bear-queue.processor";
import { DiceBearQueueService } from "@app/module/queue/service/dice-bear-queue.service";
import { DiceBearModule } from "@module/dice-bear";

@Global()
@Module({
	imports: [
		DiceBearModule.forRoot({
			styleOptions: {
				size: 200,
			},
		}),
		BullModule.registerQueue({
			name: QueueKeyConstant.MAIL_QUEUE_PROCESSOR,
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
			},
		}),
		BullModule.registerQueue({
			name: QueueKeyConstant.DICE_BEAR_QUEUE_PROCESSOR,
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
			},
		}),
	],
	providers: [
		MailQueueProcessor,
		MailQueueService,
		DiceBearQueueProcessor,
		DiceBearQueueService,
	],
	exports: [MailQueueService, DiceBearQueueService],
})
export class QueueModule {}
