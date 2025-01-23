import { ScheduleErrorMessage } from "@constant/constant";
import { IPaginationResult } from "@contract/pagination/pagination.interface";
import { IIndexPaginationOption } from "@contract/request/index-pagination-option.interface";
import { IScheduleEntity, IScheduleTimeEntity } from "@database/prisma";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ScheduleRepository } from "../repository/schedule.repository";

@Injectable()
export class ScheduleService {
	constructor(private readonly repository: ScheduleRepository) {}

	async paginateSchedule(
		nutritionistId: string,
		indexOption: IIndexPaginationOption,
	): Promise<IPaginationResult<IScheduleEntity>> {
		return this.repository.paginateSchedule(nutritionistId, indexOption);
	}

	async toggleScheduleActive(scheduleId: string): Promise<IScheduleEntity> {
		const currentSchedule = await this.repository.getScheduleById(scheduleId);

		if (!currentSchedule) {
			throw new NotFoundException(ScheduleErrorMessage.ERR_SCHEDULE_NOT_FOUND);
		}

		return this.repository.toggleScheduleActive(
			scheduleId,
			!currentSchedule.active,
		);
	}

	async paginateScheduleTime(
		nutritionistId: string,
		scheduleId: string,
		indexOption: IIndexPaginationOption,
	): Promise<IPaginationResult<IScheduleTimeEntity>> {
		return this.repository.paginateScheduleTime(
			nutritionistId,
			scheduleId,
			indexOption,
		);
	}
}
