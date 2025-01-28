import { ScheduleErrorMessage } from "@constant/message";
import {
	IIndexPaginationOption,
	IPaginationResult,
	IScheduleEntity,
	IScheduleTimeEntity,
} from "@contract";
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { TimeRange } from "@util";
import { ScheduleRepository } from "../repository/schedule.repository";
@Injectable()
export class ScheduleService {
	constructor(private readonly repository: ScheduleRepository) {}

	/**
	 * Paginates the schedule for a given nutritionist.
	 *
	 * @param nutritionistId - The ID of the nutritionist whose schedule is to be paginated.
	 * @param indexOption - The pagination options including page number and page size.
	 * @returns A promise that resolves to the paginated result of schedule entities.
	 */
	async paginateSchedule(
		nutritionistId: string,
		indexOption: IIndexPaginationOption,
	): Promise<IPaginationResult<IScheduleEntity>> {
		return await this.repository.paginateSchedule(nutritionistId, indexOption);
	}

	/**
	 * Toggles the active status of a schedule.
	 *
	 * @param {string} scheduleId - The ID of the schedule to toggle.
	 * @returns {Promise<IScheduleEntity>} - A promise that resolves to the updated schedule entity.
	 * @throws {NotFoundException} - If the schedule with the given ID is not found.
	 */
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

	/**
	 * Paginates the schedule time for a given nutritionist and schedule.
	 *
	 * @param nutritionistId - The ID of the nutritionist.
	 * @param scheduleId - The ID of the schedule.
	 * @param indexOption - The pagination options.
	 * @returns A promise that resolves to the pagination result containing schedule time entities.
	 */
	async paginateScheduleTime(
		nutritionistId: string,
		scheduleId: string,
		indexOption: IIndexPaginationOption,
	): Promise<IPaginationResult<IScheduleTimeEntity>> {
		return await this.repository.paginateScheduleTime(
			nutritionistId,
			scheduleId,
			indexOption,
		);
	}

	async createScheduleTime(
		scheduleId: string,
		scheduleTime: Pick<IScheduleTimeEntity, "start" | "end">,
	): Promise<IScheduleTimeEntity> {
		const countEntries = await this.repository.countScheduleTimes(scheduleId);

		if (countEntries >= 3) {
			throw new BadRequestException(ScheduleErrorMessage.ERR_MAX_SCHEDULE_TIME);
		}

		const timeRange = TimeRange.fromDates(scheduleTime.start, scheduleTime.end);

		const existingEntries = (
			await this.repository.getManyScheduleTimes(scheduleId)
		).map((entry) => TimeRange.fromDates(entry.start, entry.end));

		if (timeRange.overlapsOthers(existingEntries)) {
			throw new BadRequestException(
				ScheduleErrorMessage.ERR_SCHEDULE_TIME_OVERLAP,
			);
		}

		return await this.repository.insertScheduleTime({
			scheduleId,
			start: timeRange.start.toDate(),
			end: timeRange.end.toDate(),
		});
	}
}
