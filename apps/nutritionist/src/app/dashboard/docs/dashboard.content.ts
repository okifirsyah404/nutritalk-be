import { BaseApiResponse } from "@common";
import { INVALID_TOKEN_CONTENT } from "@constant/content";
import { DashboardSuccessMessage } from "@constant/message";
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
