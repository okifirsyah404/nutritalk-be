import { BullModule } from "@nestjs/bull";
import { Global, Module } from "@nestjs/common";
import { MailQueueProcessor } from "./processor/mail-queue.processor";
import { MailQueueService } from "./service/mail-queue.service";
import { MailQueueConstant } from "@constant/constant";

@Global()
@Module({
	imports: [
		BullModule.registerQueue({
			name: MailQueueConstant.MAIL_QUEUE_PROCESSOR,
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
