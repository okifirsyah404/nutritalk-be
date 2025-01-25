import { AppConfigModule } from "@config/app-config";
import { Global, Module } from "@nestjs/common";
import { CryptoUtil } from "./utilities/crypto.util";
import { DateUtil } from "./utilities/date.util";
import { FileUtil } from "./utilities/file.util";
import { PaginationUtil } from "./utilities/pagination.util";
import { PhoneNumberUtil } from "./utilities/phone-number.util";

@Global()
@Module({
	imports: [AppConfigModule],
	providers: [CryptoUtil, DateUtil, FileUtil, PaginationUtil, PhoneNumberUtil],
	exports: [CryptoUtil, DateUtil, FileUtil, PaginationUtil, PhoneNumberUtil],
})
export class UtilityModule {}
