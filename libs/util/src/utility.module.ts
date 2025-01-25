import { AppConfigModule } from "@config/app-config";
import { Global, Module } from "@nestjs/common";
import { CryptoUtils } from "./utilities/crypto.util";
import { DateUtils } from "./utilities/date.util";
import { FileUtils } from "./utilities/file.util";
import { PaginationUtil } from "./utilities/pagination.util";

@Global()
@Module({
	imports: [AppConfigModule],
	providers: [CryptoUtils, DateUtils, FileUtils, PaginationUtil],
	exports: [CryptoUtils, DateUtils, FileUtils, PaginationUtil],
})
export class UtilityModule {}
