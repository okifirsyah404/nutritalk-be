import { MailQueueKeyConstant } from "@constant/key";
import { BullModule } from "@nestjs/bull";
import { Global, Module } from "@nestjs/common";
import { MailQueueProcessor } from "./processor/mail-queue.processor";
import { MailQueueService } from "./service/mail-queue.service";

@Global()
@Module({
	imports: [
		BullModule.registerQueue({
			name: MailQueueKeyConstant.MAIL_QUEUE_PROCESSOR,
			defaultJobOptions: {
				removeOnComplete: true,
				removeOnFail: true,
			},
		}),
	],
	providers: [MailQueueProcessor, MailQueueService],
	exports: [MailQueueService],
})
export class QueueModule {}
