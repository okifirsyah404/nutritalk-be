import { PrismaModule } from "@config/prisma";
import { Test, TestingModule } from "@nestjs/testing";
import { BmiStatus } from "@prisma/client";
import { BmiRepository } from "../repository/bmi.repository";
import { BmiService } from "./bmi.service";

describe("BmiService", () => {
	let service: BmiService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				PrismaModule.forRoot({
					logs: false,
				}),
			],
			providers: [BmiService, BmiRepository],
		}).compile();

		service = module.get<BmiService>(BmiService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should calculate BMI", () => {
		const data = {
			weight: 42,
			height: 157,
		};

		expect(service.calculate(data)).toBe(17.04);
	});

	it("should get BMI result", async () => {
		const data = {
			weight: 42,
			height: 157,
		};

		const result = await service.getResult(data);

		expect(result.bmi).toBe(17.04);
		expect(result.status).toBe(BmiStatus.UNDERWEIGHT);
	});
});
