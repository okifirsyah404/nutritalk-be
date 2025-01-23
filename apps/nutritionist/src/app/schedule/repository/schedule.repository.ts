import { IPaginationResult } from "@contract/pagination/pagination.interface";
import { IIndexPaginationOption } from "@contract/request/index-pagination-option.interface";
import {
	IScheduleEntity,
	IScheduleTimeEntity,
	PrismaService,
} from "@database/prisma";
import PrismaSelector from "@database/prisma/helper/prisma.selector";
import { Injectable, Logger } from "@nestjs/common";
import { PaginationUtil } from "@util";

@Injectable()
export class ScheduleRepository {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationUtil: PaginationUtil,
	) {}

	logger = new Logger(ScheduleRepository.name);

	async paginateSchedule(
		nutritionistId: string,
		paginationOptions: IIndexPaginationOption,
	): Promise<IPaginationResult<IScheduleEntity>> {
		const allowToSort = ["dayOfWeekIndex", "active", "createdAt", "updatedAt"];

		const sortKey =
			allowToSort.find((key) => key === paginationOptions.sort) ||
			allowToSort[0];

		this.logger.log(`Sorting by ${sortKey} ${paginationOptions.order}`);

		const totalItems = await this.prisma.schedule.count({
			where: {
				nutritionistId: nutritionistId,
			},
		});

		const items = await this.prisma.schedule.findMany({
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
		});

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

	async getScheduleById(scheduleId: string): Promise<IScheduleEntity> {
		return this.prisma.schedule.findUnique({
			where: {
				id: scheduleId,
			},
			select: PrismaSelector.SCHEDULE,
		});
	}

	async toggleScheduleActive(
		scheduleId: string,
		isActive: boolean,
	): Promise<IScheduleEntity> {
		const updatedSchedule = await this.prisma.schedule.update({
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
		});

		return updatedSchedule;
	}

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

		const totalItems = await this.prisma.scheduleTime.count({
			where: {
				schedule: {
					id: scheduleId,
					nutritionistId: nutritionistId,
				},
			},
		});

		const items = await this.prisma.scheduleTime.findMany({
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
		});

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
}
