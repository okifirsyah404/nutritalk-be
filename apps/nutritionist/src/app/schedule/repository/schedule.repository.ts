import { PrismaSelector, PrismaService } from "@config/prisma";
import {
	IIndexPaginationOption,
	IPaginationResult,
	IScheduleEntity,
	IScheduleTimeEntity,
} from "@contract";
import { createDatabaseErrorHandler } from "@infrastructure";
import { Injectable, Logger } from "@nestjs/common";
import { PaginationUtil } from "@util";

@Injectable()
export class ScheduleRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationUtil: PaginationUtil,
	) {}

	logger = new Logger(ScheduleRepository.name);

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

		const sortKey =
			allowToSort.find((key) => key === paginationOptions.sort) ||
			allowToSort[0];

		this.logger.log(`Sorting by ${sortKey} ${paginationOptions.order}`);

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
				orderBy: {
					[sortKey]: paginationOptions.order,
				},
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
	async getScheduleById(scheduleId: string): Promise<IScheduleEntity> {
		return await this.prisma.schedule
			.findUnique({
				where: {
					id: scheduleId,
				},
				select: PrismaSelector.SCHEDULE,
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
	async toggleScheduleActive(
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

	async getManyScheduleTimes(
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

	async countScheduleTimes(scheduleId: string): Promise<number> {
		return await this.prisma.scheduleTime
			.count({
				where: {
					scheduleId,
				},
			})
			.catch(createDatabaseErrorHandler);
	}

	async insertScheduleTime({
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
}
