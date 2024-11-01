/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('../../../libs/@common/response/api.response'),
          {
            BaseApiResponse: {
              status: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
              message: { required: true, type: () => String },
              data: { required: true },
            },
          },
        ],
        [
          import('./app/auth/dto/request/auth-sign-in.request'),
          {
            AuthSignInRequest: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
              fcmToken: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dto/request/auth-chcek-account.request'),
          { AuthCheckAccountRequest: {} },
        ],
        [
          import('./app/auth/dto/request/auth-forget-password.request'),
          {
            AuthForgetPasswordRequest: {
              password: { required: true, type: () => String },
              confirmPassword: { required: true, type: () => String },
              signature: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dto/request/auth-otp-verify.request'),
          {
            AuthOtpVerifyRequest: {
              otp: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dto/response/auth-forget-password.response'),
          {
            AuthForgetPasswordResponse: {
              email: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dto/response/auth-otp-forget-password.response'),
          {
            AuthOtpVerifyForgetPasswordResponse: {
              signature: { required: true, type: () => String },
              email: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dto/response/auth-sign-in.response'),
          {
            AuthSignInResponse: {
              accessToken: { required: true, type: () => String },
              refreshToken: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./app/auth/dto/request/auth-refresh-token.request'),
          { AuthRefreshTokenRequest: {} },
        ],
        [
          import('./app/profile/dto/request/update-profile.request'),
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
          import('./app/profile/dto/response/profile.response'),
          {
            ProfileResponse: {
              id: { required: true, type: () => String },
              nip: { required: false, type: () => String },
              nidn: { required: false, type: () => String },
              accountId: { required: false, type: () => String },
              profileId: { required: false, type: () => String },
              type: { required: false, type: () => Object },
              account: { required: false, type: () => Object },
              profile: { required: false, type: () => Object },
              consultationMeta: { required: false, type: () => Object },
              occupation: { required: false, type: () => Object },
              price: { required: false, type: () => Object },
              registrationCertificate: { required: false, type: () => Object },
              schedules: { required: false, type: () => [Object] },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./app/auth/controller/auth-forget-password.controller'),
          {
            AuthForgetPasswordController: {
              requestForgetPasswordOtp: {
                description:
                  'Http endpoint for requesting an OTP to reset the password.\n\nRequest body:\n- email: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken',
              },
              verifyForgetPasswordOtp: {
                description:
                  'Http endpoint for verifying the OTP to reset the password.\n\nRequest body:\n- email: (required) string\n- otp: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of signature',
              },
              forgetPassword: {
                description:
                  'Http endpoint for resetting the password.\n\nRequest body:\n- password: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of email',
              },
            },
          },
        ],
        [
          import('./app/auth/controller/auth.controller'),
          {
            AuthController: {
              signIn: {
                description:
                  'Http endpoint for signing up a user.\n\nRequest body:\n- email: (required) string\n- password: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken',
              },
              getRefreshToken: {
                description:
                  'Http endpoint for refreshing the access token.\n\nRequest header:\n- x-refresh-token: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of accessToken and refreshToken',
              },
              signOut: {
                description:
                  'Http endpoint for signing out a user.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: undefined',
              },
            },
          },
        ],
        [
          import('./app/nutritionist.controller'),
          { NutritionistController: { getHello: { type: String } } },
        ],
        [
          import('./app/profile/controller/profile.controller'),
          {
            ProfileController: {
              getProfile: {},
              updateProfile: {},
              uploadProfile: {},
            },
          },
        ],
      ],
    },
  };
};
