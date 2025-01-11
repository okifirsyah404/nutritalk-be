/* eslint-disable no-console */

import { IApiResponse } from "@contract/response/api-response.interface";
import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	Logger,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(
		exception: HttpException,
		host: ArgumentsHost,
	): Response<any, Record<string, any>> {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const status = exception.getStatus();

		this.logger.warn(exception.message);

		let baseResponse: IApiResponse<never>;

		const message =
			(exception.getResponse() as { message: string }).message ||
			exception.name;

		if (exception.message.includes("ENOENT")) {
			baseResponse = {
				status: "Not Found",
				statusCode: 404,
				timestamp: Date.now(),
				message: "ERR_ENOENT_RESOURCE_FILE_NOT_FOUND",
			} as IApiResponse<never>;

			return response.status(404).send(baseResponse);
		}

		process.on("uncaughtException", (error) => {
			console.error("Uncaught Exception:", error);

			baseResponse = {
				status: "Internal Server Error",
				statusCode: 500,
				timestamp: Date.now(),
				message: "ERR_UNCAUGHT_EXCEPTION",
			} as IApiResponse<never>;

			return response.status(500).send(baseResponse);
		});

		process.on("unhandledRejection", (reason, promise) => {
			console.error("Unhandled Rejection at:", promise, "reason:", reason);

			baseResponse = {
				status: "Internal Server Error",
				statusCode: 500,
				timestamp: Date.now(),
				message: "ERR_UNHANDLED_REJECTION",
			} as IApiResponse<never>;

			return response.status(500).send(baseResponse);
		});

		baseResponse = {
			status: this._toFriendlyErrorStatus(exception.name),
			statusCode: status,
			timestamp: Date.now(),
			message: message,
		} as IApiResponse<never>;

		response.status(status).send(baseResponse);
	}

	private _toFriendlyErrorStatus(error: string): string {
		return error
			.replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before each uppercase letter
			.replace(/Exception$/, "") // Remove the "Exception" suffix
			.trim(); // Remove any leading or trailing spaces
	}
}
