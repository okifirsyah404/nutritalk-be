import { IChangePasswordRequest, IProfileEntity } from "@contract";
import { Gender } from "@prisma/client";
import { IDeviceInfoEntity } from "@contract/entities/device-info.entity.interface";

export interface IRegisterRequest
	extends IChangePasswordRequest,
		Partial<
			Pick<IProfileEntity, "placeOfBirth" | "dateOfBirth" | "address" | "bio">
		>,
		Pick<IDeviceInfoEntity, "fcmToken"> {
	name: string;
	email: string;
	gender: Gender;
	phoneNumber: string;
}
