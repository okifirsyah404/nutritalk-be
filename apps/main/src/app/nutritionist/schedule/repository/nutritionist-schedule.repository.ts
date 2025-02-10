import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	IIndexPaginationOption,
	IPaginationResult,
	IScheduleEntity,
	IScheduleTimeEntity,
} from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
import { DatabaseUtil, PaginationUtil } from "@util";

@Injectable()
export class NutritionistScheduleRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly databaseUtil: DatabaseUtil,
		private readonly paginationUtil: PaginationUtil,
	) {}

	logger = new Logger(NutritionistScheduleRepository.name);

	/**
	 * Retrieves a paginated list of schedules for a specified nutritionist.
	 *
	 * @param nutritionistId - The nutritionist's unique identifier.
	 * @param paginationOptions - Options for pagination and sorting, including:
	 *   - page: Current page number to be retrieved.
	 *   - limit: The maximum number of items per page.
	 *   - sort: A valid field name to sort by.
	 *   - order: The sort direction (e.g., ASC or DESC).
	 * @returns A promise that resolves to a paginated result containing the schedules and additional pagination details.
	 */
	async paginateSchedule(
		nutritionistId: string,
		paginationOptions: IIndexPaginationOption,
	): Promise<IPaginationResult<IScheduleEntity>> {
		const allowToSort = ["dayOfWeekIndex", "active", "createdAt", "updatedAt"];

		const order = this.databaseUtil.getOrderBy(
			paginationOptions.sort,
			allowToSort,
			paginationOptions.order,
		);
		const totalItems = await this.prisma.schedule
			.count({
				where: {
					nutritionistId: nutritionistId,
				},
			})
			.catch(createDatabaseErrorHandler);

		const items = await this.prisma.schedule
			.findMany({
				skip: this.paginationUtil.countOffset(paginationOptions),
				take: paginationOptions.limit,
				orderBy: order,
				where: {
					nutritionistId: nutritionistId,
				},
				select: {
					...PrismaSelector.SCHEDULE,
					scheduleTimes: {
						select: PrismaSelector.SCHEDULE_TIME,
					},
				},
			})
			.catch(createDatabaseErrorHandler);

		return {
			pagination: {
				page: paginationOptions.page,
				limit: paginationOptions.limit,
				totalItems,
				totalPages: this.paginationUtil.countTotalPages({
					totalItems,
					limit: paginationOptions.limit,
				}),
			},
			items,
		};
	}

	/**
	 * Retrieves the schedule entity by its unique identifier.
	 *
	 * @param scheduleId - The unique identifier of the schedule to retrieve.
	 * @returns A Promise that resolves to the schedule entity, or null if not found.
	 * @throws An error if a database-related issue occurs.
	 */
	async findScheduleById(scheduleId: string): Promise<IScheduleEntity> {
		return await this.prisma.schedule
			.findUnique({
				where: {
					id: scheduleId,
				},
				select: {
					...PrismaSelector.SCHEDULE,
					scheduleTimes: {
						select: PrismaSelector.SCHEDULE_TIME,
					},
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Toggles the active status of a schedule.
	 *
	 * @param scheduleId - The ID of the schedule to update.
	 * @param isActive - The new active status to set for the schedule.
	 * @returns A promise that resolves to the updated schedule entity.
	 *
	 * @throws Will throw an error if the update operation fails.
	 */
	async updateActiveSchedule(
		scheduleId: string,
		isActive: boolean,
	): Promise<IScheduleEntity> {
		const updatedSchedule = await this.prisma.schedule
			.update({
				where: {
					id: scheduleId,
				},
				data: {
					active: isActive,
				},
				select: {
					...PrismaSelector.SCHEDULE,
					scheduleTimes: {
						select: PrismaSelector.SCHEDULE_TIME,
					},
				},
			})
			.catch(createDatabaseErrorHandler);

		return updatedSchedule;
	}

	/**
	 * Paginates schedule times for a given nutritionist and schedule.
	 *
	 * @param nutritionistId - The ID of the nutritionist.
	 * @param scheduleId - The ID of the schedule.
	 * @param paginationOptions - The pagination options including page, limit, sort, and order.
	 * @returns A promise that resolves to an object containing pagination details and the list of schedule times.
	 *
	 * @throws Will throw an error if there is an issue with the database query.
	 */
	async paginateScheduleTime(
		nutritionistId: string,
		scheduleId: string,
		paginationOptions: IIndexPaginationOption,
	): Promise<IPaginationResult<IScheduleTimeEntity>> {
		const allowToSort = ["active", "start", "createdAt", "updatedAt"];

		const sortKey =
			allowToSort.find((key) => key === paginationOptions.sort) ||
			allowToSort[0];

		this.logger.log(`Sorting by ${sortKey} ${paginationOptions.order}`);

		const totalItems = await this.prisma.scheduleTime
			.count({
				where: {
					schedule: {
						id: scheduleId,
						nutritionistId: nutritionistId,
					},
				},
			})
			.catch(createDatabaseErrorHandler);

		const items = await this.prisma.scheduleTime
			.findMany({
				skip: this.paginationUtil.countOffset(paginationOptions),
				take: paginationOptions.limit,
				orderBy: {
					[sortKey]: paginationOptions.order,
				},
				where: {
					schedule: {
						id: scheduleId,
						nutritionistId: nutritionistId,
					},
				},
				select: PrismaSelector.SCHEDULE_TIME,
			})
			.catch(createDatabaseErrorHandler);

		return {
			pagination: {
				page: paginationOptions.page,
				limit: paginationOptions.limit,
				totalItems,
				totalPages: this.paginationUtil.countTotalPages({
					totalItems,
					limit: paginationOptions.limit,
				}),
			},
			items,
		};
	}

	/**
	 * Finds and retrieves multiple schedule times based on the provided schedule ID.
	 *
	 * @param scheduleId - The ID of the schedule to find times for.
	 * @returns A promise that resolves to an array of IScheduleTimeEntity objects.
	 * @throws Will throw an error if the database query fails.
	 */
	async findManyScheduleTimes(
		scheduleId: string,
	): Promise<IScheduleTimeEntity[]> {
		return await this.prisma.scheduleTime
			.findMany({
				where: {
					scheduleId,
				},
				select: PrismaSelector.SCHEDULE_TIME,
			})
			.catch(createDatabaseErrorHandler);
	}

	async findManyScheduleTimesExcludingId(
		scheduleId: string,
		scheduleTimeId: string,
	): Promise<IScheduleTimeEntity[]> {
		return await this.prisma.scheduleTime
			.findMany({
				where: {
					scheduleId,
					id: {
						not: scheduleTimeId,
					},
				},
				select: PrismaSelector.SCHEDULE_TIME,
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Finds a schedule time by its unique identifier.
	 *
	 * @param scheduleTimeId - The unique identifier of the schedule time.
	 * @returns A promise that resolves to the schedule time entity if found, or throws an error if not found.
	 */
	async findScheduleTimeById(
		scheduleTimeId: string,
	): Promise<IScheduleTimeEntity> {
		return await this.prisma.scheduleTime
			.findUnique({
				where: {
					id: scheduleTimeId,
				},
				select: PrismaSelector.SCHEDULE_TIME,
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Counts the number of schedule times associated with a given schedule ID.
	 *
	 * @param {string} scheduleId - The ID of the schedule to count times for.
	 * @returns {Promise<number>} A promise that resolves to the number of schedule times.
	 * @throws Will throw an error if there is an issue with the database operation.
	 */
	async countScheduleTimes(scheduleId: string): Promise<number> {
		return await this.prisma.scheduleTime
			.count({
				where: {
					scheduleId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Creates a new schedule time entry in the database.
	 *
	 * @param {Partial<IScheduleTimeEntity>} param0 - An object containing the schedule time details.
	 * @param {string} param0.scheduleId - The ID of the schedule to which the time entry belongs.
	 * @param {Date} param0.start - The start time of the schedule.
	 * @param {Date} param0.end - The end time of the schedule.
	 * @returns {Promise<IScheduleTimeEntity>} A promise that resolves to the created schedule time entity.
	 * @throws Will throw an error if the database operation fails.
	 */
	async createScheduleTime({
		scheduleId,
		start,
		end,
	}: Partial<IScheduleTimeEntity>): Promise<IScheduleTimeEntity> {
		return await this.prisma.scheduleTime
			.create({
				data: {
					start: start,
					end: end,
					schedule: {
						connect: {
							id: scheduleId,
						},
					},
				},
				select: PrismaSelector.SCHEDULE_TIME,
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Updates the start and end times of a schedule time entry.
	 *
	 * @param scheduleTimeId - The unique identifier of the schedule time entry to update.
	 * @param scheduleTime - An object containing the new start and/or end times.
	 * @param scheduleTime.start - The new start time (optional).
	 * @param scheduleTime.end - The new end time (optional).
	 * @returns A promise that resolves to the updated schedule time entity.
	 * @throws Will throw an error if the update operation fails.
	 */
	async updateScheduleTime(
		scheduleTimeId: string,
		{ start, end }: Partial<IScheduleTimeEntity>,
	): Promise<IScheduleTimeEntity> {
		return await this.prisma.scheduleTime
			.update({
				where: {
					id: scheduleTimeId,
				},
				data: {
					start,
					end,
				},
				select: PrismaSelector.SCHEDULE_TIME,
			})
			.catch(createDatabaseErrorHandler);
	}

	/**
	 * Deletes a schedule time entry from the database.
	 *
	 * @param scheduleTimeId - The unique identifier of the schedule time to be deleted.
	 * @returns A promise that resolves when the schedule time is successfully deleted.
	 * @throws Will call `createDatabaseErrorHandler` if there is an error during deletion.
	 */
	async deleteScheduleTime(scheduleTimeId: string): Promise<void> {
		await this.prisma.scheduleTime
			.delete({
				where: {
					id: scheduleTimeId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}
}
