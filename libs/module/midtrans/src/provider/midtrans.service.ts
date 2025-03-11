import { AppConfigService } from "@config/app-config";
import { AppErrrorMessage } from "@constant/message";
import {
	MidtransGenerateSnapTokenRequestBody,
	MidtransGenerateSnapTokenResponse,
} from "@contract";
import { HttpService } from "@nestjs/axios";
import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { catchError, firstValueFrom } from "rxjs";

@Injectable()
export class MidtransService {
	constructor(
		private readonly config: AppConfigService,
		private readonly httpService: HttpService,
	) {}

	private readonly logger = new Logger(MidtransService.name);

	async generateSnapToken({
		transactionDetail,
		customerDetail,
	}: MidtransGenerateSnapTokenRequestBody): Promise<MidtransGenerateSnapTokenResponse> {
		const reqBody = {
			transaction_details: {
				order_id: transactionDetail.trId,
				gross_amount:
					transactionDetail.consultationFee * transactionDetail.quantity,
			},
			item_details: [
				{
					id: transactionDetail.nutritionistId,
					price: transactionDetail.consultationFee,
					quantity: transactionDetail.quantity,
					name: transactionDetail.nutritionistName,
				},
			],
			customer_details: {
				first_name: customerDetail.name,
				email: customerDetail.email,
				phone: customerDetail.phone,
			},
		};

		const snapUrl = this.config.midtransConfig.snapUrl;

		const { data } = await firstValueFrom(
			this.httpService
				.post<{
					token: string;
					redirect_url: string;
				}>(snapUrl, reqBody, {
					auth: {
						username: this.config.midtransConfig.serverKey,
						password: "",
					},
				})
				.pipe(
					catchError((error) => {
						this.logger.error("Error generating snap token", error);
						throw new InternalServerErrorException(
							AppErrrorMessage.ERR_FAILED_GENERATE_SNAP_TOKEN,
						);
					}),
				),
		);

		return {
			token: data.token,
			redirectUrl: data.redirect_url,
		};
	}
}
