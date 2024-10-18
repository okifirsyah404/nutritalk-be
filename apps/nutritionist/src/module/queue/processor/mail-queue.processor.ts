import { IMailOtpOptions, MailService } from '@mail/mailer';
import {
  OnQueueCompleted,
  OnQueueError,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MailQueueConstant } from '../../../common/constant/queue/mail-queue.constant';

@Processor(MailQueueConstant.MAIL_QUEUE_PROCESSOR)
export class MailQueueProcessor {
  constructor(private readonly mailService: MailService) {}

  private readonly logger = new Logger(MailQueueProcessor.name);

  @Process(MailQueueConstant.MAIL_OTP_QUEUE_PROCESS)
  async sendOtpMail(job: Job<IMailOtpOptions>): Promise<void> {
    const data = job.data;

    await this.mailService.sendOTP(data);
  }

  @OnQueueCompleted()
  onCompleted(job: Job): void {
    this.logger.log(`Job ${job.id} has been finished`);
  }

  @OnQueueError()
  onError(error: Error): void {
    this.logger.error(error.message);
  }
}
