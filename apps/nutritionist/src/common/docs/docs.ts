import { TagObject } from '@common/docs/tag';

/**
 * Represents a documentation tag.
 */
export abstract class DocsTag {
  static readonly AUTH = 'Auth ';
  static readonly FORGET_PASSWORD = 'Forget Password';
  static readonly PROFILE = 'Profile';
  static readonly ACCOUNT = 'Account';
  static readonly CHANGE_PASSWORD = 'Change Password';

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
   * Represents the account tag object.
   */
  private static readonly account: TagObject = {
    name: DocsTag.ACCOUNT,
    description: 'Endpoints that manage user accounts',
  };

  /**
   * Represents the change password tag object.
   */
  private static readonly changePassword: TagObject = {
    name: DocsTag.CHANGE_PASSWORD,
    description: 'Endpoints for changing the password',
  };

  /**
   * Represents an array of tag objects.
   */
  static readonly tags = [
    DocsTag.auth,
    DocsTag.forgetPassword,
    DocsTag.profile,
    DocsTag.account,
    DocsTag.changePassword,
  ];
}
