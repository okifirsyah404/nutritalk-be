import { BaseApiResponse } from "@common/response/base-api.response";
import {
	DashboardSuccessMessage,
	INVALID_TOKEN_CONTENT,
} from "@constant/constant";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { DashboardResponse } from "../dto/response/dashboard.response";

export abstract class DashboardContentDocs {
	static readonly SUCCESS_GET_DASHBOARD: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: DashboardSuccessMessage.SUCCESS_GET_DASHBOARD,
				data: DashboardResponse.exampleData,
			}),
		},
	};

	static readonly UNAUTHORIZED: ContentObject = {
		"application/json": {
			examples: {
				...INVALID_TOKEN_CONTENT,
			},
		},
	};
}
