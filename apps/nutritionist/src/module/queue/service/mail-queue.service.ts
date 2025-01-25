import { MailQueueKeyConstant } from "@constant/key";
import { IMailOtpOptions } from "@contract";
import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class MailQueueService {
	constructor(
		@InjectQueue(MailQueueKeyConstant.MAIL_QUEUE_PROCESSOR)
		private readonly mailQueue: Queue,
	) {}

	private readonly logger = new Logger(MailQueueService.name);

	async sendOtpMail(data: IMailOtpOptions): Promise<void> {
		await this.mailQueue.add(MailQueueKeyConstant.MAIL_OTP_QUEUE_PROCESS, data);
	}
}
