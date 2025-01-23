import { AppConfigModule } from "@config/app-config";
import { Global, Module } from "@nestjs/common";
import { CryptoUtils } from "./utilities/crypto.util";
import DateUtils from "./utilities/date.util";
import FileUtils from "./utilities/file.util";

@Global()
@Module({
	imports: [AppConfigModule],
	providers: [CryptoUtils, DateUtils, FileUtils],
	exports: [CryptoUtils, DateUtils, FileUtils],
})
export class UtilityModule {}
