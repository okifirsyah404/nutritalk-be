import { BaseApiResponse } from '@common/response/api.response';
import { IApiResponse } from '@contract/response/api-response.interface';
import { IJwtSignaturePayload } from '@jwt/app-jwt';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignatureTokenGuard } from '@sign/signature';
import GetSignaturePayload from '@sign/signature/infrastructure/decorator/get-signature-payload.decorator';
import { AuthForgetPasswordSuccessMessage } from 'apps/nutritionist/src/common/constant/message/success/auth-forget-password-success.message';
import { DocsTag } from 'apps/nutritionist/src/common/docs/docs';
import { AuthCheckAccountRequest } from '../dto/request/auth-chcek-account.request';
import { AuthForgetPasswordRequest } from '../dto/request/auth-forget-password.request';
import { AuthOtpVerifyRequest } from '../dto/request/auth-otp-verify.request';
import { AuthForgetPasswordResponse } from '../dto/response/auth-forget-password.response';
import { AuthOtpVerifyForgetPasswordResponse } from '../dto/response/auth-otp-forget-password.response';
import { AuthForgetPasswordService } from '../service/auth-forget-password.service';

@ApiTags(DocsTag.FORGET_PASSWORD)
@Controller('auth/forget-password')
export class AuthForgetPasswordController {
  constructor(private readonly service: AuthForgetPasswordService) {}

  @Post('otp')
  async requestForgetPasswordOtp(
    @Body() reqBody: AuthCheckAccountRequest,
  ): Promise<IApiResponse<AuthForgetPasswordResponse>> {
    const result = await this.service.checkAccount(reqBody);

    return BaseApiResponse.created({
      message: AuthForgetPasswordSuccessMessage.SUCCESS_SEND_OTP_TO_EMAIL,
      data: AuthForgetPasswordResponse.fromEntity(result),
    });
  }

  @Post('otp/verify')
  async verifyForgetPasswordOtp(
    @Body() reqBody: AuthOtpVerifyRequest,
  ): Promise<IApiResponse<AuthOtpVerifyForgetPasswordResponse>> {
    const result = await this.service.verifyOtp(reqBody);

    return BaseApiResponse.created({
      message: AuthForgetPasswordSuccessMessage.SUCCESS_VERIFY_OTP,
      data: AuthOtpVerifyForgetPasswordResponse.fromEntity(result),
    });
  }

  @UseGuards(SignatureTokenGuard)
  @Post()
  async forgetPassword(
    @Body() reqBody: AuthForgetPasswordRequest,
    @GetSignaturePayload() signaturePayload: IJwtSignaturePayload,
  ): Promise<IApiResponse<AuthForgetPasswordResponse>> {
    const result = await this.service.resetPassword({
      email: signaturePayload.email,
      reqData: reqBody,
    });

    return BaseApiResponse.created({
      message: AuthForgetPasswordSuccessMessage.SUCCESS_RESET_PASSWORD,
      data: AuthForgetPasswordResponse.fromEntity(result),
    });
  }
}
