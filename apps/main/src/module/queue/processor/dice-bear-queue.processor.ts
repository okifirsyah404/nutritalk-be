import { QueueKeyConstant } from "@constant/key";
import { IDiceBear, IDiceBearGenerateParams } from "@contract";
import {
	OnQueueCompleted,
	OnQueueError,
	Process,
	Processor,
} from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";
import { DiceBearService } from "@module/dice-bear";

@Processor(QueueKeyConstant.DICE_BEAR_QUEUE_PROCESSOR)
export class DiceBearQueueProcessor {
	constructor(private readonly diceBearService: DiceBearService) {}

	private readonly logger = new Logger(DiceBearQueueProcessor.name);

	@Process(QueueKeyConstant.DICE_BEAR_QUEUE_PROCESS)
	async generateImage(job: Job<IDiceBearGenerateParams>): Promise<IDiceBear> {
		const data = job.data;

		return await this.diceBearService.generateAvatar(data);
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
