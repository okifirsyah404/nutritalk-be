import { AccountErrorMessage } from "@constant/message";
import { INutritionistEntity, IPatientEntity } from "@contract";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AccountRole } from "@prisma/client";

export const GetNutritionistLogged = createParamDecorator(
	(data, ctx: ExecutionContext): INutritionistEntity => {
		const user: INutritionistEntity | IPatientEntity = ctx
			.switchToHttp()
			.getRequest().user;

		if (!isNutritionist(user)) {
			throw new Error(AccountErrorMessage.ERR_ACCOUNT_NOT_NUTRITIONIST);
		}

		return user;
	},
);

function isNutritionist(
	user: INutritionistEntity | IPatientEntity,
): user is INutritionistEntity {
	return (
		(user as INutritionistEntity).account.role.accountRole ===
		AccountRole.NUTRITIONIST
	);
}
