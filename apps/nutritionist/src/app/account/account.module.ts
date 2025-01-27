import { OtpModule } from "@module/otp";
import { SignatureModule } from "@module/signature";
import { Module } from "@nestjs/common";
import { AccountChangePasswordController } from "./controller/account-change-password.controller";
import { AccountController } from "./controller/account.controller";
import { AccountChangePasswordRepository } from "./repository/account-change-password.repository";
import { AccountRepository } from "./repository/account.repository";
import { AccountChangePasswordService } from "./service/account-change-password.service";
import { AccountService } from "./service/account.service";

@Module({
	imports: [OtpModule, SignatureModule],
	controllers: [AccountController, AccountChangePasswordController],
	providers: [
		AccountService,
		AccountRepository,
		AccountChangePasswordService,
		AccountChangePasswordRepository,
	],
})
export class AccountModule {}
