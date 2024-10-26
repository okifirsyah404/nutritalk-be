import { TagObject } from '@common/common';

/**
 * Represents a documentation tag.
 */
export abstract class DocsTag {
  static readonly AUTH = 'Auth ';
  static readonly FORGET_PASSWORD = 'Forget Password';
  static readonly PROFILE = 'Profile';

  /**
   * Represents the auth tag object.
   */
  private static readonly auth: TagObject = {
    name: DocsTag.AUTH,
    description: 'Endpoints for authentication',
  };

  /**
   * Represents the forget password tag object.
   */
  private static readonly forgetPassword: TagObject = {
    name: DocsTag.FORGET_PASSWORD,
    description: 'Endpoints for forget password',
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
    DocsTag.auth,
    DocsTag.forgetPassword,
    DocsTag.profile,
  ];
}
