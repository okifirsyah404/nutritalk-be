import { AccountErrorMessage } from "@constant/message";
import { INutritionistEntity, IPatientEntity } from "@contract";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AccountRole } from "@prisma/client";

export const GetPatientLogged = createParamDecorator(
	(data, ctx: ExecutionContext): IPatientEntity => {
		const user: INutritionistEntity | IPatientEntity = ctx
			.switchToHttp()
			.getRequest().user;

		if (!isPatient(user)) {
			throw new Error(AccountErrorMessage.ERR_ACCOUNT_NOT_PATIENT);
		}

		return user;
	},
);

function isPatient(
	user: INutritionistEntity | IPatientEntity,
): user is IPatientEntity {
	return (
		(user as IPatientEntity).account.role.accountRole === AccountRole.PATIENT
	);
}
