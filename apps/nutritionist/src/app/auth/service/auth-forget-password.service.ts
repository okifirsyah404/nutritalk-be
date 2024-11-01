import { AppConfigService } from '@config/app-config';

import { AuthErrorMessage } from '@common/constant/message/error/auth-error.message';
import { IOtpRequest, IOtpVerify } from '@contract/otp/otp-result.interface';
import { IAccount } from '@database/prisma';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OtpService } from '@otp/otp';
import { OtpPurpose } from '@prisma/client';
import { SignatureService } from '@sign/signature';
import { MailQueueService } from '../../../module/queue/service/mail-queue.service';
import { AuthCheckAccountRequest } from '../dto/request/auth-chcek-account.request';
import { AuthForgetPasswordRequest } from '../dto/request/auth-forget-password.request';
import { AuthOtpVerifyRequest } from '../dto/request/auth-otp-verify.request';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthForgetPasswordService {
  constructor(
    private readonly config: AppConfigService,
    private readonly repository: AuthRepository,
    private readonly otpService: OtpService,
    private readonly mailQueueService: MailQueueService,
    private readonly signatureService: SignatureService,
  ) {}

  async checkAccount(reqData: AuthCheckAccountRequest): Promise<IOtpRequest> {
    const result = await this.repository.findAccountByEmail(reqData.email);

    if (!result) {
      throw new NotFoundException(AuthErrorMessage.ERR_ACCOUNT_NOT_FOUND);
    }

    const otpResult = await this.otpService.generateOtp({
      email: result.email,
      length: 6,
      purpose: OtpPurpose.AUTH_FORGOT_PASSWORD,
    });

    this.mailQueueService.sendOtpMail({
      to: this.config.smtpConfig.user,
      subject: 'Forget Password OTP',
      body: {
        recipientName: result.email,
        otpCode: otpResult.code,
        purpose: OtpPurpose.AUTH_FORGOT_PASSWORD,
        minutes: otpResult.expiry.minutes,
      },
    });

    return {
      email: result.email,
    };
  }

  async verifyOtp(reqData: AuthOtpVerifyRequest): Promise<IOtpVerify> {
    const validateResult = await this.otpService.validateOtp({
      email: reqData.email,
      purpose: OtpPurpose.AUTH_FORGOT_PASSWORD,
      code: reqData.otp,
      deleteAfterValidation: true,
    });

    if (!validateResult) {
      throw new BadRequestException(AuthErrorMessage.ERR_OTP_INVALID);
    }

    const signature = await this.signatureService.generateSignature({
      sub: reqData.otp,
      email: reqData.email,
    });

    return {
      email: reqData.email,
      signature,
    };
  }

  async resetPassword({
    email,
    reqData,
  }: {
    email: string;
    reqData: AuthForgetPasswordRequest;
  }): Promise<IOtpRequest> {
    if (reqData.password !== reqData.confirmPassword) {
      throw new BadRequestException(AuthErrorMessage.ERR_PASSWORD_NOT_MATCH);
    }

    const account: IAccount = await this.repository.findAccountByEmail(email);

    if (!account) {
      throw new NotFoundException(AuthErrorMessage.ERR_ACCOUNT_NOT_FOUND);
    }

    await this.repository.updatePassword(account.id, reqData.password);

    return {
      email,
    };
  }
}
