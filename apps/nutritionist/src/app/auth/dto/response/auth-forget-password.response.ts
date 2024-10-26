import { IOtpRequest } from '@contract/contract/otp/otp-result.interface';

export class AuthForgetPasswordResponse implements IOtpRequest {
  constructor(email: string) {
    this.email = email;
  }

  email: string;

  static fromEntity(entity: IOtpRequest): AuthForgetPasswordResponse {
    return new AuthForgetPasswordResponse(entity.email);
  }

  static exampleData: AuthForgetPasswordResponse =
    new AuthForgetPasswordResponse('johndoe@example.com');
}
