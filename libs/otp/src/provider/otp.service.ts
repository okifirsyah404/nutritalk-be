import { PrismaService } from '@database/prisma';
import { Injectable } from '@nestjs/common';
import * as randString from 'randomstring';
import {
  DeleteOtpParam,
  GetOtpParam,
  OtpExpirateDuration,
  OtpGeneratedResult,
  OtpGenerateParam,
  OtpValidateParam,
  SaveOtpParam,
} from '../interface/otp.interface';

@Injectable()
export class OtpService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generates a One-Time Password (OTP) for a given email and purpose.
   *
   * @param {Object} params - The parameters for generating the OTP.
   * @param {string} params.email - The email address for which the OTP is generated.
   * @param {string} params.purpose - The purpose for which the OTP is generated.
   * @param {number} [params.length=6] - The length of the OTP. Defaults to 6.
   * @returns {Promise<OtpGeneratedResult>} A promise that resolves to the generated OTP result.
   */
  async generateOtp({
    email,
    purpose,
    length = 6,
  }: OtpGenerateParam): Promise<OtpGeneratedResult> {
    const code = randString.generate({
      length,
      charset: 'numeric',
      readable: false,
    });

    const expiry: OtpExpirateDuration = {
      days: 0,
      hours: 0,
      minutes: 5,
      seconds: 0,
    };

    const expiration = await this._generateExpiration(expiry);

    const otp = await this._saveOtp({
      email,
      code,
      purpose,
      expiration,
      expiry,
    });

    return otp;
  }

  /**
   * Validates the provided OTP (One-Time Password) for a given email and purpose.
   *
   * @param {OtpValidateParam} param - The parameters for OTP validation.
   * @param {string} param.email - The email associated with the OTP.
   * @param {string} param.purpose - The purpose for which the OTP was generated.
   * @param {string} param.code - The OTP code to be validated.
   * @param {boolean} [param.deleteAfterValidation=true] - Flag indicating whether to delete the OTP after validation.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the OTP is valid, otherwise `false`.
   */
  async validateOtp({
    email,
    purpose,
    code,
    deleteAfterValidation = true,
  }: OtpValidateParam): Promise<boolean> {
    const otp = await this._getOtp({ email, purpose, code });

    if (otp) {
      if (deleteAfterValidation) {
        await this._deleteOtp({ email, code });
      }

      return true;
    }

    return false;
  }

  /**
   * Deletes an OTP (One-Time Password) based on the provided email and code.
   *
   * @param {DeleteOtpParam} param - The parameters for deleting the OTP.
   * @param {string} param.email - The email associated with the OTP.
   * @param {string} param.code - The OTP code to be deleted.
   * @returns {Promise<void>} A promise that resolves when the OTP is deleted.
   */
  async deleteOtp({ email, code }: DeleteOtpParam): Promise<void> {
    await this._deleteOtp({ email, code });
  }

  /**
   * Saves an OTP (One-Time Password) record to the database.
   *
   * @param {SaveOtpParam} param - The parameters for saving the OTP.
   * @param {string} param.email - The email associated with the OTP.
   * @param {string} param.code - The OTP code.
   * @param {string} param.purpose - The purpose of the OTP.
   * @param {Date} param.expiration - The expiration date of the OTP.
   * @param {Date} param.expiry - The expiry date of the OTP.
   * @returns {Promise<OtpGeneratedResult>} A promise that resolves to the result of the OTP generation.
   * @private
   */
  private async _saveOtp({
    email,
    code,
    purpose,
    expiration,
    expiry,
  }: SaveOtpParam): Promise<OtpGeneratedResult> {
    const result = await this.prisma.otp.create({
      data: {
        email,
        code: code,
        purpose: purpose,
        expired: expiration,
      },
      select: {
        email: true,
        code: true,
        expired: true,
        purpose: true,
      },
    });

    return {
      email: result.email,
      code: result.code,
      purpose: result.purpose,
      expiration: result.expired,
      expiry: expiry,
    };
  }

  /**
   * Retrieves an OTP (One-Time Password) record from the database based on the provided parameters.
   *
   * @param {Object} params - The parameters for retrieving the OTP.
   * @param {string} params.email - The email associated with the OTP.
   * @param {string} params.purpose - The purpose of the OTP.
   * @param {string} params.code - The OTP code.
   *
   * @returns {Promise<OtpGeneratedResult | null>} A promise that resolves to the OTP record if found, or null if not found.
   *
   * @private
   */
  private async _getOtp({
    email,
    purpose,
    code,
  }: GetOtpParam): Promise<OtpGeneratedResult | null> {
    const result = await this.prisma.otp.findFirst({
      where: {
        email,
        purpose,
        code,
        expired: {
          gte: new Date(),
        },
      },
      select: {
        id: true,
        email: true,
        code: true,
        expired: true,
      },
    });

    if (!result) {
      return null;
    }

    return {
      email: result.email,
      code: result.code,
      purpose,
      expiration: result.expired,
    };
  }

  /**
   * Deletes OTP entries from the database that match the provided email and code.
   *
   * @param {DeleteOtpParam} param - The parameters for deleting the OTP.
   * @param {string} param.email - The email associated with the OTP.
   * @param {string} param.code - The OTP code to be deleted.
   * @returns {Promise<void>} A promise that resolves when the OTP entries are deleted.
   * @private
   */
  private async _deleteOtp({ email, code }: DeleteOtpParam): Promise<void> {
    await this.prisma.otp.deleteMany({
      where: {
        email,
        code,
      },
    });
  }

  /**
   * Generates an expiration date based on the provided duration.
   *
   * @param {OtpExpirateDuration} duration - The duration object containing days, hours, minutes, and seconds.
   * @param {number} [duration.days=0] - The number of days to add to the current date.
   * @param {number} [duration.hours=0] - The number of hours to add to the current date.
   * @param {number} [duration.minutes=0] - The number of minutes to add to the current date.
   * @param {number} [duration.seconds=0] - The number of seconds to add to the current date.
   * @returns {Promise<Date>} A promise that resolves to the calculated expiration date.
   * @private
   */
  private async _generateExpiration({
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  }: OtpExpirateDuration): Promise<Date> {
    return new Promise((resolve) => {
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + days);
      expiration.setHours(expiration.getHours() + hours);
      expiration.setMinutes(expiration.getMinutes() + minutes);
      expiration.setSeconds(expiration.getSeconds() + seconds);

      return resolve(expiration);
    });
  }
}
