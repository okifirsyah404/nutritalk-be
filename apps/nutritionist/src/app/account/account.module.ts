import { Module } from "@nestjs/common";
import { AccountController } from "./controller/account.controller";
import { AccountRepository } from "./repository/account.repository";
import { AccountService } from "./service/account.service";

@Module({
	controllers: [AccountController],
	providers: [AccountService, AccountRepository],
})
export class AccountModule {}
