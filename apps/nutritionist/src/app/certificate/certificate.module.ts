import { Module } from "@nestjs/common";
import { CertificateController } from "./controller/certificate.controller";
import { CertificateService } from "./service/certificate.service";
import { CertificateRepository } from "./repository/certificate.repository";

@Module({
	controllers: [CertificateController],
	providers: [CertificateService, CertificateRepository],
})
export class CertificateModule {}
