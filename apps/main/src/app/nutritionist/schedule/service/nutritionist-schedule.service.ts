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
import { NutritionistScheduleRepository } from "../repository/nutritionist-schedule.repository";

@Injectable()
export class NutritionistScheduleService {
	constructor(private readonly repository: NutritionistScheduleRepository) {}

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
		const currentSchedule = await this.repository.findScheduleById(scheduleId);

		if (!currentSchedule) {
			throw new NotFoundException(ScheduleErrorMessage.ERR_SCHEDULE_NOT_FOUND);
		}

		return this.repository.updateActiveSchedule(
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

	/**
	 * Creates a new schedule time for a given schedule.
	 *
	 * @param scheduleId - The ID of the schedule to which the time will be added.
	 * @param scheduleTime - An object containing the start and end times for the new schedule time.
	 * @returns A promise that resolves to the created schedule time entity.
	 * @throws {BadRequestException} If the maximum number of schedule times (3) is exceeded.
	 * @throws {BadRequestException} If the new schedule time overlaps with existing schedule times.
	 */
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
			await this.repository.findManyScheduleTimes(scheduleId)
		).map((entry) => TimeRange.fromDates(entry.start, entry.end));

		if (timeRange.overlapsOthers(existingEntries)) {
			throw new BadRequestException(
				ScheduleErrorMessage.ERR_SCHEDULE_TIME_OVERLAP,
			);
		}

		return await this.repository.createScheduleTime({
			scheduleId,
			start: timeRange.start.toDate(),
			end: timeRange.end.toDate(),
		});
	}

	/**
	 * Retrieves a schedule time entity by its ID.
	 *
	 * @param {string} scheduleTimeId - The ID of the schedule time to retrieve.
	 * @returns {Promise<IScheduleTimeEntity>} A promise that resolves to the schedule time entity.
	 * @throws {NotFoundException} If no schedule time is found with the given ID.
	 */
	async getScheduleTime(scheduleTimeId: string): Promise<IScheduleTimeEntity> {
		const result = await this.repository.findScheduleTimeById(scheduleTimeId);

		if (!result) {
			throw new NotFoundException(
				ScheduleErrorMessage.ERR_SCHEDULE_TIME_NOT_FOUND,
			);
		}

		return result;
	}

	/**
	 * Updates the schedule time for a given schedule time ID.
	 *
	 * @param scheduleTimeId - The ID of the schedule time to update.
	 * @param scheduleTime - An object containing the new start and end times for the schedule.
	 * @returns A promise that resolves to the updated schedule time entity.
	 * @throws NotFoundException - If the schedule time with the given ID is not found.
	 * @throws BadRequestException - If the new schedule time overlaps with existing schedule times.
	 */
	async updateScheduleTime(
		scheduleTimeId: string,
		scheduleTime: Partial<Pick<IScheduleTimeEntity, "start" | "end">>,
	): Promise<IScheduleTimeEntity> {
		const currentScheduleTime =
			await this.repository.findScheduleTimeById(scheduleTimeId);

		if (!currentScheduleTime) {
			throw new NotFoundException(
				ScheduleErrorMessage.ERR_SCHEDULE_TIME_NOT_FOUND,
			);
		}

		const timeRange = TimeRange.fromDates(
			scheduleTime.start || currentScheduleTime.start,
			scheduleTime.end || currentScheduleTime.end,
		);

		const existingEntries = (
			await this.repository.findManyScheduleTimes(scheduleTimeId)
		).map((entry) => TimeRange.fromDates(entry.start, entry.end));

		if (timeRange.overlapsOthers(existingEntries)) {
			throw new BadRequestException(
				ScheduleErrorMessage.ERR_SCHEDULE_TIME_OVERLAP,
			);
		}

		return await this.repository.updateScheduleTime(currentScheduleTime.id, {
			start: timeRange.start.toDate(),
			end: timeRange.end.toDate(),
		});
	}

	/**
	 * Deletes a schedule time by its ID.
	 *
	 * @param {string} scheduleTimeId - The ID of the schedule time to delete.
	 * @returns {Promise<void>} - A promise that resolves when the schedule time is deleted.
	 * @throws {NotFoundException} - If the schedule time with the given ID is not found.
	 */
	async deleteScheduleTime(scheduleTimeId: string): Promise<void> {
		const currentScheduleTime =
			await this.repository.findScheduleTimeById(scheduleTimeId);

		if (!currentScheduleTime) {
			throw new NotFoundException(
				ScheduleErrorMessage.ERR_SCHEDULE_TIME_NOT_FOUND,
			);
		}

		await this.repository.deleteScheduleTime(scheduleTimeId);
	}
}
