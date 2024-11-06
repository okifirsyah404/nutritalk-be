/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('../../../libs/@common/response/base-api.response'),
          {
            BaseApiResponse: {
              status: { required: true, type: () => String },
              statusCode: { required: true, type: () => Number },
              timestamp: { required: true, type: () => Number },
              message: { required: true, type: () => String },
              data: { required: true },
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
          import('./app/auth/dto/request/auth-sign-in.request'),
          {
            AuthSignInRequest: {
              email: {
                required: true,
                type: () => String,
                description:
                  'Email api property.\n\nDecorators:\n- IsEmail\n- IsString\n- IsNotEmpty',
              },
              password: {
                required: true,
                type: () => String,
                description:
                  'Password api property.\n\nDecorators:\n- IsString\n- IsNotEmpty',
              },
              fcmToken: {
                required: true,
                type: () => String,
                description:
                  'Fcm token api property.\n\nDecorators:\n- IsString\n- IsNotEmpty',
              },
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
              password: {
                required: true,
                type: () => String,
                description:
                  'Password api property.\n\nDecorators:\n- IsString\n- IsNotEmpty\n- IsStrongPassword',
              },
              confirmPassword: {
                required: true,
                type: () => String,
                description:
                  'Confirm password api property.\n\nDecorators:\n- IsString\n- IsNotEmpty\n- IsStrongPassword',
              },
              signature: {
                required: true,
                type: () => String,
                description:
                  'Signature api property.\n\nDecorators:\n- IsString\n- IsNotEmpty',
              },
            },
          },
        ],
        [
          import('./app/auth/dto/request/auth-otp-verify.request'),
          {
            AuthOtpVerifyRequest: {
              otp: {
                required: true,
                type: () => String,
                description:
                  'Otp api property.\n\nDecorators:\n- IsString\n- IsNotEmpty',
              },
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
          import('./app/profile/dto/response/profile.response'),
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
          import('./app/account/dto/response/account.response'),
          {
            AccountResponse: {
              id: { required: true, type: () => String },
              email: { required: true, type: () => String },
              role: { required: true, type: () => Object },
              googleId: { required: true, type: () => String },
              createdAt: { required: false, type: () => Date },
              updatedAt: { required: false, type: () => Date },
            },
          },
        ],
        [
          import('./app/price/dto/request/update-price.request'),
          {
            UpdatePriceRequest: {
              online: { required: true, type: () => Number, minimum: 50000 },
              offline: { required: true, type: () => Number, minimum: 50000 },
            },
          },
        ],
        [
          import('./app/price/dto/response/price.response'),
          {
            PriceResponse: {
              id: { required: true, type: () => String },
              online: { required: true, type: () => Number },
              offline: { required: true, type: () => Number },
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
              resetPassword: {
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
          import('./app/profile/controller/profile.controller'),
          {
            ProfileController: {
              getProfile: {
                description:
                  'Http endpoint for getting the profile of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of profile information',
              },
              updateProfile: {
                description:
                  'Http endpoint for updating the profile of a nutritionist.\n\nRequest body:\n- name: (required) string\n- phoneNumber: (required) string\n- address: (required) string\n- placeOfBirth: (required) string\n- dateOfBirth: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information',
              },
              uploadProfile: {
                description:
                  'Http endpoint for uploading a profile image.\n\nRequest body:\n- image: (required) file\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information',
              },
              setAvailability: {
                description:
                  'Http endpoint for setting the availability of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information',
              },
            },
          },
        ],
        [
          import('./app/account/controller/account.controller'),
          {
            AccountController: {
              getAccount: {
                description:
                  'Http endpoint for getting the account of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of account information',
              },
            },
          },
        ],
        [
          import('./app/price/controller/price.controller'),
          {
            PriceController: {
              getPrice: {
                description:
                  'Retrieves the price information associated with the currently logged-in nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of price information',
              },
              updatePrice: {
                description:
                  'Updates the price information associated with the currently logged-in nutritionist.\n\nRequest body:\n- online: (required) int number\n- offline: (required) int number\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated price information',
              },
            },
          },
        ],
      ],
    },
  };
};
