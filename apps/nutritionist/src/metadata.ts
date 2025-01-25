/* eslint-disable */
export default async () => {
	const t = {
		["./libs/contract/src"]: await import("../../../libs/contract/src"),
	};
	return {
		"@nestjs/swagger": {
			models: [
				[
					import("../../../libs/common/src/request/index-pagination.request"),
					{
						IndexPaginationRequest: {
							search: { required: false, type: () => String },
							sort: { required: false, type: () => String },
							order: {
								required: false,
								enum: t["./libs/contract/src"].SortOrderEnum,
							},
							page: { required: true, type: () => Number, default: 1 },
							limit: {
								required: true,
								type: () => Number,
								default: 10,
								maximum: 100,
							},
						},
					},
				],
				[
					import("../../../libs/common/src/response/base-api.response"),
					{
						BaseApiResponse: {
							status: { required: true, type: () => String },
							statusCode: { required: true, type: () => Number },
							timestamp: { required: true, type: () => Number },
							message: { required: true, type: () => String },
							data: { required: true },
						},
						BaseApiPaginationResponse: {
							status: { required: true, type: () => String },
							statusCode: { required: true, type: () => Number },
							timestamp: { required: true, type: () => Number },
							message: { required: true, type: () => String },
							data: { required: true },
						},
					},
				],
				[
					import("./app/account/dto/response/account.response"),
					{
						AccountResponse: {
							id: { required: true, type: () => String },
							email: { required: true, type: () => String },
							role: { required: true, type: () => Object },
							createdAt: { required: false, type: () => Date },
							updatedAt: { required: false, type: () => Date },
						},
					},
				],
				[
					import("./app/auth/dto/response/auth-forget-password.response"),
					{
						AuthForgetPasswordResponse: {
							email: { required: true, type: () => String },
						},
					},
				],
				[
					import("./app/auth/dto/response/auth-otp-forget-password.response"),
					{
						AuthOtpVerifyForgetPasswordResponse: {
							signature: { required: true, type: () => String },
							email: { required: true, type: () => String },
						},
					},
				],
				[
					import("./app/auth/dto/request/auth-sign-in.request"),
					{
						AuthSignInRequest: {
							email: {
								required: true,
								type: () => String,
								description:
									"Email api property.\n\nDecorators:\n- IsEmail\n- IsString\n- IsNotEmpty",
								format: "email",
							},
							password: {
								required: true,
								type: () => String,
								description:
									"Password api property.\n\nDecorators:\n- IsString\n- IsNotEmpty",
							},
							fcmToken: {
								required: true,
								type: () => String,
								description:
									"Fcm token api property.\n\nDecorators:\n- IsString\n- IsNotEmpty",
							},
						},
					},
				],
				[
					import("./app/auth/dto/request/auth-chcek-account.request"),
					{ AuthCheckAccountRequest: {} },
				],
				[
					import("./app/auth/dto/request/auth-forget-password.request"),
					{
						AuthForgetPasswordRequest: {
							password: {
								required: true,
								type: () => String,
								description:
									"Password api property.\n\nDecorators:\n- IsString\n- IsNotEmpty\n- IsStrongPassword",
							},
							confirmPassword: {
								required: true,
								type: () => String,
								description:
									"Confirm password api property.\n\nDecorators:\n- IsString\n- IsNotEmpty\n- IsStrongPassword",
							},
							signature: {
								required: true,
								type: () => String,
								description:
									"Signature api property.\n\nDecorators:\n- IsString\n- IsNotEmpty",
							},
						},
					},
				],
				[
					import("./app/auth/dto/request/auth-otp-verify.request"),
					{
						AuthOtpVerifyRequest: {
							otp: {
								required: true,
								type: () => String,
								description:
									"Otp api property.\n\nDecorators:\n- IsString\n- IsNotEmpty",
							},
						},
					},
				],
				[
					import("./app/auth/dto/response/auth.response"),
					{
						AuthResponse: {
							accessToken: { required: true, type: () => String },
							refreshToken: { required: true, type: () => String },
							accountRole: { required: true, type: () => Object },
						},
					},
				],
				[
					import("./app/auth/dto/request/auth-refresh-token.request"),
					{ AuthRefreshTokenRequest: {} },
				],
				[
					import("./app/dashboard/dto/response/dashboard.response"),
					{
						DashboardResponse: {
							nutritionist: { required: true, type: () => Object },
							countScheduledConsultation: {
								required: true,
								type: () => Number,
							},
							scheduledConsultations: { required: true, type: () => [Object] },
							countPendingConsultation: { required: true, type: () => Number },
							pendingConsultations: { required: true, type: () => [Object] },
						},
					},
				],
				[
					import("./app/price/dto/response/price.response"),
					{
						PriceResponse: {
							id: { required: true, type: () => String },
							online: { required: true, type: () => Number },
							offline: { required: true, type: () => Number },
						},
					},
				],
				[
					import("./app/price/dto/request/update-price.request"),
					{
						UpdatePriceRequest: {
							online: { required: true, type: () => Number, minimum: 50000 },
							offline: { required: true, type: () => Number, minimum: 50000 },
						},
					},
				],
				[
					import("./app/profile/dto/response/profile.response"),
					{
						ProfileResponse: {
							id: { required: true, type: () => String },
							type: { required: true, type: () => Object },
							nip: { required: true, type: () => String },
							nidn: { required: true, type: () => String },
							isAvailable: { required: true, type: () => Boolean },
							account: { required: false, type: () => Object },
							profile: { required: false, type: () => Object },
							consultationMeta: { required: false, type: () => Object },
						},
					},
				],
				[
					import("./app/profile/dto/request/update-profile.request"),
					{
						UpdateProfileRequest: {
							name: { required: true, type: () => String },
							phoneNumber: { required: true, type: () => String },
							address: { required: true, type: () => String },
							placeOfBirth: { required: true, type: () => String },
							dateOfBirth: { required: true, type: () => Date },
						},
					},
				],
				[
					import("./app/schedule/dto/response/schedule-time.response"),
					{
						ScheduleTimeResponse: {
							id: { required: true, type: () => String },
							active: { required: true, type: () => Boolean },
							start: { required: true, type: () => Date },
							end: { required: true, type: () => Date },
						},
					},
				],
				[
					import("./app/schedule/dto/response/schedule.response"),
					{
						ScheduleResponse: {
							id: { required: true, type: () => String },
							active: { required: true, type: () => Boolean },
							dayOfWeek: { required: true, type: () => Object },
							dayOfWeekIndex: { required: true, type: () => Number },
							scheduleTimes: { required: false, type: () => [Object] },
						},
					},
				],
			],
			controllers: [
				[
					import("./app/account/controller/account.controller"),
					{
						AccountController: {
							getAccount: {
								description:
									"Http endpoint for getting the account of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of account information",
							},
						},
					},
				],
				[
					import("./app/auth/controller/auth-forget-password.controller"),
					{
						AuthForgetPasswordController: {
							requestForgetPasswordOtp: {
								description:
									"Http endpoint for requesting an OTP to reset the password.\n\nRequest body:\n- email: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken",
							},
							verifyForgetPasswordOtp: {
								description:
									"Http endpoint for verifying the OTP to reset the password.\n\nRequest body:\n- email: (required) string\n- otp: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of signature",
							},
							resetPassword: {
								description:
									"Http endpoint for resetting the password.\n\nRequest body:\n- password: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of email",
							},
						},
					},
				],
				[
					import("./app/auth/controller/auth.controller"),
					{
						AuthController: {
							signIn: {
								description:
									"Http endpoint for signing up a user.\n\nRequest body:\n- email: (required) string\n- password: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken",
							},
							getRefreshToken: {
								description:
									"Http endpoint for refreshing the access token.\n\nRequest header:\n- x-refresh-token: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken",
							},
							signOut: {
								description:
									"Http endpoint for signing out a user.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: undefined",
							},
						},
					},
				],
				[
					import("./app/dashboard/controller/dashboard.controller"),
					{
						DashboardController: {
							getDashboardData: {
								description:
									"Http endpoint for getting the dashboard data of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of dashboard data",
							},
						},
					},
				],
				[
					import("./app/health-check/controller/health-check.controller"),
					{ HealthCheckController: { check: { type: Object } } },
				],
				[
					import("./app/price/controller/price.controller"),
					{
						PriceController: {
							getPrice: {
								description:
									"Retrieves the price information associated with the currently logged-in nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of price information",
							},
							updatePrice: {
								description:
									"Updates the price information associated with the currently logged-in nutritionist.\n\nRequest body:\n- online: (required) int number\n- offline: (required) int number\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated price information",
							},
						},
					},
				],
				[
					import("./app/profile/controller/profile.controller"),
					{
						ProfileController: {
							getProfile: {
								description:
									"Http endpoint for getting the profile of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of profile information",
							},
							updateProfile: {
								description:
									"Http endpoint for updating the profile of a nutritionist.\n\nRequest body:\n- name: (required) string\n- phoneNumber: (required) string\n- address: (required) string\n- placeOfBirth: (required) string\n- dateOfBirth: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information",
							},
							uploadProfile: {
								description:
									"Http endpoint for uploading a profile image.\n\nRequest body:\n- image: (required) file\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information",
							},
							setAvailability: {
								description:
									"Http endpoint for setting the availability of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information",
							},
						},
					},
				],
				[
					import("./app/schedule/controller/schedule.controller"),
					{
						ScheduleController: {
							paginateSchedule: {},
							toggleScheduleActive: {},
							paginateScheduleTime: {},
						},
					},
				],
			],
		},
	};
};
