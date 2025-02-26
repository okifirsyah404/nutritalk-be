import { IChangePasswordRequest, IProfileEntity } from "@contract";
import { Gender } from "@prisma/client";

export interface IRegisterRequest
	extends Partial<
			Pick<IProfileEntity, "placeOfBirth" | "dateOfBirth" | "address" | "bio">
		>,
		Pick<IChangePasswordRequest, "signature"> {
	name: string;
	email: string;
	gender: Gender;
	phoneNumber: string;
}

export interface IPreRegisterRequest extends IChangePasswordRequest {
	email: string;
	fcmToken: string;
}
