import { BaseApiResponse } from "@common";
import { INVALID_TOKEN_CONTENT } from "@constant/content";
import { AccountErrorMessage, AccountSuccessMessage } from "@constant/message";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { AccountResponse } from "../../dto/response/account.response";

export abstract class AccountContentDocs {
	static readonly GET_ACCOUNT_SUCCESS: ContentObject = {
		"application/json": {
			example: BaseApiResponse.success({
				message: AccountSuccessMessage.SUCCESS_GET_ACCOUNT,
				data: AccountResponse.exampleData,
			}),
		},
	};

	static readonly NOT_FOUND: ContentObject = {
		"application/json": {
			example: BaseApiResponse.notFound({
				message: AccountErrorMessage.ERR_ACCOUNT_NOT_FOUND,
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
