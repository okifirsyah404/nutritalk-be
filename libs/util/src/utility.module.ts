import { AppConfigModule } from "@config/app-config";
import { Global, Module } from "@nestjs/common";
import { CryptoUtil } from "./utilities/crypto.util";
import { DatabaseUtil } from "./utilities/database.util";
import { DateUtil } from "./utilities/date.util";
import { FileUtil } from "./utilities/file.util";
import { PaginationUtil } from "./utilities/pagination.util";
import { PhoneNumberUtil } from "./utilities/phone-number.util";
import { GeneralUtil } from "./utilities/general.util";

@Global()
@Module({
	imports: [AppConfigModule],
	providers: [
		GeneralUtil,
		CryptoUtil,
		DateUtil,
		FileUtil,
		PaginationUtil,
		PhoneNumberUtil,
		DatabaseUtil,
	],
	exports: [
		GeneralUtil,
		CryptoUtil,
		DateUtil,
		FileUtil,
		PaginationUtil,
		PhoneNumberUtil,
		DatabaseUtil,
	],
})
export class UtilityModule {}
