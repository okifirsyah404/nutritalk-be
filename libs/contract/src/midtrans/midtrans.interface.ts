export interface MidtransGenerateSnapTokenRequestBody {
	transactionDetail: {
		trId: string;
		nutritionistId: string;
		nutritionistName: string;
		consultationFee: number;
		quantity: number;
		grossAmount: number;
	};
	customerDetail: {
		name: string;
		email: string;
		phone: string;
	};
}

export interface MidtransGenerateSnapTokenResponse {
	token: string;
	redirectUrl: string;
}
