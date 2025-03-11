import { AppConfigModule } from "@config/app-config";
import { HttpModule } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { MidtransService } from "./midtrans.service";

describe("MidtransService", () => {
	let service: MidtransService;

	beforeEach(async () => {
		jest.spyOn(console, "log").mockImplementation((message) => {
			process.stdout.write(message + "\n");
		});

		const module: TestingModule = await Test.createTestingModule({
			imports: [AppConfigModule, HttpModule.register({})],
			providers: [MidtransService],
		}).compile();

		service = module.get<MidtransService>(MidtransService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should generate snap token", async () => {
		const transactionDetail = {
			trId: `transaction-id-${+Date.now()}`,
			nutritionistId: "nutritionist-id",
			nutritionistName: "Nutritionist Name",
			consultationFee: 50000,
			quantity: 2,
		};

		const customerDetail = {
			name: "Customer Name",
			email: "johndoe@gmail.com",
			phone: "081234567890",
		};

		const result = await service.generateSnapToken({
			transactionDetail,
			customerDetail,
		});

		console.log(`result ${JSON.stringify(result)}`);

		expect(result).toHaveProperty("token");
		expect(result).toHaveProperty("redirectUrl");
	});
});
