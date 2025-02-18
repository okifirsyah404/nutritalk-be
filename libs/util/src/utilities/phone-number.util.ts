export class PhoneNumberUtil {
	transformToLocalePhoneNumber(phoneNumber: string): string {
		if (phoneNumber.startsWith("0")) {
			return "+62" + phoneNumber.substring(1);
		}
		return phoneNumber;
	}

	static transformToLocalePhoneNumber(phoneNumber: string): string {
		return new PhoneNumberUtil().transformToLocalePhoneNumber(phoneNumber);
	}
}
