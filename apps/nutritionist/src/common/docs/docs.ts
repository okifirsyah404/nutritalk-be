import { TagObject } from '@common/common';

/**
 * Represents a documentation tag.
 */
export abstract class DocsTag {
  static readonly AUTH_SIGN_IN = 'Auth Sign In';
  static readonly AUTH_REFRESH_TOKEN = 'Auth Refresh Token';
  static readonly PROFILE = 'Profile';

  /**
   * Represents the authentication tag object.
   */
  private static readonly authSignIn: TagObject = {
    name: DocsTag.AUTH_SIGN_IN,
    description: 'Endpoints that require authentication',
  };

  /**
   * Represents the refresh token tag object.
   */
  private static readonly authRefreshToken: TagObject = {
    name: DocsTag.AUTH_REFRESH_TOKEN,
    description: 'Endpoints that require refresh token',
  };

  /**
   * Represents the profile tag object.
   */
  private static readonly profile: TagObject = {
    name: DocsTag.PROFILE,
    description: 'Endpoints that manage user profiles',
  };

  /**
   * Represents an array of tag objects.
   */
  static readonly tags = [
    DocsTag.authSignIn,
    DocsTag.authRefreshToken,
    DocsTag.profile,
  ];
}
