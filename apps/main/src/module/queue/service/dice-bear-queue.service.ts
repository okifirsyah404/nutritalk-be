import { QueueKeyConstant } from "@constant/key";
import { IDiceBear, IDiceBearGenerateParams } from "@contract";
import { InjectQueue } from "@nestjs/bull";
import { Injectable, Logger } from "@nestjs/common";
import { Queue } from "bull";

@Injectable()
export class DiceBearQueueService {
	constructor(
		@InjectQueue(QueueKeyConstant.DICE_BEAR_QUEUE_PROCESSOR)
		private readonly diceBearQueue: Queue<IDiceBearGenerateParams>,
	) {}

	private readonly logger = new Logger(DiceBearQueueService.name);

	async generateImage(
		data: IDiceBearGenerateParams,
		callback?: (result: IDiceBear) => Promise<void>,
	): Promise<void> {
		const job = await this.diceBearQueue.add(
			QueueKeyConstant.DICE_BEAR_QUEUE_PROCESS,
			data,
		);

		await job.finished().then(async (result?: IDiceBear) => {
			if (result) {
				if (callback) {
					callback(result);
				}
			}
		});
	}
}
