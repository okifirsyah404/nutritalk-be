import { IJwtToken } from '@jwt/app-jwt';

export class AuthSignInResponse implements IJwtToken {
  private constructor({ accessToken, refreshToken }: IJwtToken) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  readonly accessToken: string;
  readonly refreshToken: string;

  static fromEntity(entity: IJwtToken): AuthSignInResponse {
    return new AuthSignInResponse(entity);
  }

  static exampleData: AuthSignInResponse = new AuthSignInResponse({
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
    refreshToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ',
  });
}
