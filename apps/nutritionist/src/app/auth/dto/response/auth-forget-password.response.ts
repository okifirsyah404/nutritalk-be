import { IOtpRequest } from '@contract/otp/otp-result.interface';

export class AuthForgetPasswordResponse implements IOtpRequest {
  private constructor(email: string) {
    this.email = email;
  }

  email: string;

  static fromEntity(entity: IOtpRequest): AuthForgetPasswordResponse {
    return new AuthForgetPasswordResponse(entity.email);
  }

  static exampleData: AuthForgetPasswordResponse =
    new AuthForgetPasswordResponse('johndoe@example.com');
}
