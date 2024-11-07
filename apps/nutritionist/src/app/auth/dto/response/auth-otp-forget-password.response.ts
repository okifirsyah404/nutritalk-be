import { IOtpVerify } from '@contract/otp/otp-result.interface';

export class AuthOtpVerifyForgetPasswordResponse implements IOtpVerify {
  private constructor({ signature, email }: IOtpVerify) {
    this.signature = signature;
    this.email = email;
  }

  signature: string;
  email: string;

  static fromEntity(entity: IOtpVerify): AuthOtpVerifyForgetPasswordResponse {
    return new AuthOtpVerifyForgetPasswordResponse(entity);
  }

  static readonly exampleData: AuthOtpVerifyForgetPasswordResponse =
    new AuthOtpVerifyForgetPasswordResponse({
      signature:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
      email: 'johndoe@example.com',
    });
}
