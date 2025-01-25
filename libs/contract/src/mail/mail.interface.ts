import { OtpPurpose } from "@prisma/client";

export interface IMailOtpOptions {
	to: string[] | string;
	subject: string;
	body: {
		recipientName: string | undefined;
		otpCode: string | undefined;
		purpose: OtpPurpose | undefined;
		minutes: number | undefined;
	};
}
