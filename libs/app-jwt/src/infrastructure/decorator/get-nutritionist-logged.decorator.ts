import { INutritionistEntity, IPatientEntity } from "@database/prisma";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AccountRole } from "@prisma/client";

const GetNutritionistLogged = createParamDecorator(
	(data, ctx: ExecutionContext): INutritionistEntity => {
		const user: INutritionistEntity | IPatientEntity = ctx
			.switchToHttp()
			.getRequest().user;

		if (!isNutritionist(user)) {
			throw new Error("User is not a nutritionist");
		}

		return user as INutritionistEntity;
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

export default GetNutritionistLogged;
