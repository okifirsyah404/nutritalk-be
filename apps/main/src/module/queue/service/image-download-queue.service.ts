import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { QueueKeyConstant } from "@constant/key";
import { Queue } from "bull";
import { IImageDownload } from "@contract";

@Injectable()
export class ImageDownloadQueueService {
	constructor(
		@InjectQueue(QueueKeyConstant.IMAGE_DOWNLOAD_QUEUE_PROCESSOR)
		private readonly queue: Queue<IImageDownload>,
	) {}

	async downloadImage(
		data: IImageDownload,
		callBack?: (result: string) => Promise<void>,
	): Promise<void> {
		const job = await this.queue.add(
			QueueKeyConstant.IMAGE_DOWNLOAD_QUEUE_PROCESS,
			data,
		);

		await job.finished().then(async (result?: string) => {
			if (result) {
				if (callBack) {
					callBack(result);
				}
			}
		});
	}
}
