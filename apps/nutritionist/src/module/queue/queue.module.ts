import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { MailQueueConstant } from '../../common/constant/queue/mail-queue.constant';
import { MailQueueProcessor } from './processor/mail-queue.processor';
import { MailQueueService } from './service/mail-queue.service';

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
