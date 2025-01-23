import { IPaginationMeta } from "@contract/pagination/pagination.interface";
import {
	IApiPaginationResponse,
	IApiResponse,
} from "@contract/response/api-response.interface";

export class BaseApiResponse<T> implements IApiResponse<T> {
	constructor({
		status,
		statusCode,
		timestamp,
		message,
		data,
	}: {
		status: string;
		statusCode: number;
		timestamp: number;
		message: string;
		data: T;
	}) {
		this.statusCode = statusCode;
		this.status = status;
		this.timestamp = timestamp;
		this.message = message;
		this.data = data;
	}

	readonly status: string;
	readonly statusCode: number;
	readonly timestamp: number;
	readonly message: string;
	readonly data: T;

	static success<R>({
		statusCode = 200,
		message,
		data,
	}: {
		statusCode?: number;
		message: string;
		data: R;
	}): BaseApiResponse<R> {
		return new BaseApiResponse<R>({
			status: "Success",
			statusCode,
			timestamp: Date.now(),
			message,
			data,
		});
	}

	static created<R>({
		statusCode = 201,
		message,
		data,
	}: {
		statusCode?: number;
		message: string;
		data: R;
	}): BaseApiResponse<R> {
		return new BaseApiResponse<R>({
			status: "Created",
			statusCode,
			timestamp: Date.now(),
			message,
			data,
		});
	}

	static badRequest({
		statusCode = 400,
		message,
	}: {
		statusCode?: number;
		message: string;
	}): BaseApiResponse<undefined> {
		return new BaseApiResponse<undefined>({
			status: "Bad Request",
			statusCode,
			timestamp: Date.now(),
			message,
			data: undefined,
		});
	}

	static unauthorized({
		statusCode = 401,
		message,
	}: {
		statusCode?: number;
		message: string;
	}): BaseApiResponse<undefined> {
		return new BaseApiResponse<undefined>({
			status: "Unauthorized",
			statusCode,
			timestamp: Date.now(),
			message,
			data: undefined,
		});
	}

	static notFound({
		statusCode = 404,
		message,
	}: {
		statusCode?: number;
		message: string;
	}): BaseApiResponse<undefined> {
		return new BaseApiResponse<undefined>({
			status: "Not Found",
			statusCode,
			timestamp: Date.now(),
			message,
			data: undefined,
		});
	}

	static forbidden({
		statusCode = 403,
		message,
	}: {
		statusCode?: number;
		message: string;
	}): BaseApiResponse<undefined> {
		return new BaseApiResponse<undefined>({
			status: "Forbidden",
			statusCode,
			timestamp: Date.now(),
			message,
			data: undefined,
		});
	}

	static conflict({
		statusCode = 409,
		message,
	}: {
		statusCode?: number;
		message: string;
	}): BaseApiResponse<undefined> {
		return new BaseApiResponse<undefined>({
			status: "Conflict",
			statusCode,
			timestamp: Date.now(),
			message,
			data: undefined,
		});
	}
}

export class BaseApiPaginationResponse<T> implements IApiPaginationResponse<T> {
	status: string;
	statusCode: number;
	timestamp: number;
	message: string;
	pagination: IPaginationMeta;
	data: T[];

	constructor({
		status,
		statusCode,
		timestamp,
		message,
		pagination,
		data,
	}: {
		status: string;
		statusCode: number;
		timestamp: number;
		message: string;
		pagination: IPaginationMeta;
		data: T[];
	}) {
		this.status = status;
		this.statusCode = statusCode;
		this.timestamp = timestamp;
		this.message = message;
		this.pagination = pagination;
		this.data = data;
	}

	static success<R>({
		statusCode = 200,
		message,
		pagination,
		data,
	}: {
		statusCode?: number;
		message: string;
		pagination: IPaginationMeta;
		data: R[];
	}): BaseApiPaginationResponse<R> {
		return new BaseApiPaginationResponse<R>({
			status: "Success",
			statusCode,
			timestamp: Date.now(),
			message,
			pagination,
			data,
		});
	}
}
