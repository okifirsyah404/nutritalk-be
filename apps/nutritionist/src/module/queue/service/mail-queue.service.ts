import { MailQueueConstant } from "@constant/constant";
import { IMailOtpOptions } from "@mail/mailer";
import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class MailQueueService {
	constructor(
		@InjectQueue(MailQueueConstant.MAIL_QUEUE_PROCESSOR)
		private readonly mailQueue: Queue,
	) {}

	private readonly logger = new Logger(MailQueueService.name);

	async sendOtpMail(data: IMailOtpOptions): Promise<void> {
		await this.mailQueue.add(MailQueueConstant.MAIL_OTP_QUEUE_PROCESS, data);
	}
}
