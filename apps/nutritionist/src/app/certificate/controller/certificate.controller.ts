import { Controller } from "@nestjs/common";
import { CertificateService } from "../service/certificate.service";

@Controller("certificate")
export class CertificateController {
	constructor(private readonly certificateService: CertificateService) {}
}
