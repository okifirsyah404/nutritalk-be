import { Controller } from "@nestjs/common";
import { OccupationService } from "./occupation.service";

@Controller("occupation")
export class OccupationController {
	constructor(private readonly occupationService: OccupationService) {}
}
