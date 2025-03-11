import { AppConfigModule } from "@config/app-config";
import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { MidtransService } from "./provider/midtrans.service";

@Global()
@Module({
	imports: [AppConfigModule, HttpModule.register({})],
	providers: [MidtransService],
	exports: [MidtransService],
})
export class MidtransModule {}
