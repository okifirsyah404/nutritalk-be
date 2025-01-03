import { INVALID_TOKEN_CONTENT } from "@common/constant/docs/content/invalid-token.content";
import { AuthErrorMessage } from "@common/constant/message/error/auth-error.message";
import { BaseApiResponse } from "@common/response/base-api.response";
import { ContentObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { AccountSuccessMessage } from "@nutritionist/common/constant/message/success/account-success.message";
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
				message: AuthErrorMessage.ERR_ACCOUNT_NOT_FOUND,
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
