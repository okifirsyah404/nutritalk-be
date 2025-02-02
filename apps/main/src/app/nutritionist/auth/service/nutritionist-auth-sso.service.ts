import { Injectable } from "@nestjs/common";
import { NutritionistAuthSsoRepository } from "../repository/nutritionist-auth-sso.repository";

@Injectable()
export class NutritionistAuthSsoService {
	constructor(private readonly repository: NutritionistAuthSsoRepository) {}
}
