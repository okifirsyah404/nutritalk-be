/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { AppConfigService } from "@config/app-config";
import { IMailOtpOptions } from "@contract";
import { Injectable, Logger } from "@nestjs/common";
import { OtpPurpose } from "@prisma/client";
import * as ejs from "ejs";
import path from "path";
import { MailerService } from "./mailer.service";

@Injectable()
export class MailService {
	constructor(
		private readonly mailer: MailerService,
		private readonly config: AppConfigService,
	) {
		this.hostMail = config.smtpConfig.host;
	}

	private readonly logger = new Logger(MailService.name);

	/**
	 *
	 * The host email address.
	 *
	 * @private
	 */
	private readonly hostMail: string;

	/**
	 *
	 * The path to the email template.
	 *
	 * @private
	 */
	private readonly templatePath = path.join(
		process.cwd(),
		"views",
		"template",
		"mail",
	);

	/**
	 * Sends an OTP (One-Time Password) email to a specified recipient.
	 *
	 * @param {IMailOtpOptions} options - The options for sending the OTP email.
	 * @returns {Promise<void>} A promise that resolves when the email is sent successfully.
	 * @throws {Error} Throws an error if the email could not be sent.
	 */
	async sendOTP({
		to,
		subject,
		body: { recipientName, otpCode, purpose, minutes },
	}: IMailOtpOptions): Promise<void> {
		try {
			const html = await ejs.renderFile(
				path.join(this.templatePath, "otp.ejs"),
				{
					recipientName: recipientName ?? to,
					otpCode: otpCode,
					purpose: this._generateOtpPurpose(purpose),
					minutes: minutes,
				},
			);

			const senderMail = this.config.smtpConfig.user;

			const mailOptions = {
				from: senderMail,
				to,
				subject,
				html,
			};

			await this.mailer.sendMail(mailOptions);
			this.logger.log(`Email sent: ${mailOptions.to}`);
		} catch (error: any) {
			if (error.message.toString().includes("550")) {
				this.logger.error(error.message);
				throw Error(error.message);
			}

			this.logger.error(error.message);
			throw error;
		}
	}

	/**
	 * Generates a string representation of the given OTP purpose.
	 *
	 * @param purpose - The purpose of the OTP.
	 * @returns A string that represents the OTP purpose.
	 *
	 * Possible purposes and their corresponding string representations:
	 * - `OtpPurpose.AUTH`: 'Auth'
	 * - `OtpPurpose.AUTH_FORGOT_PASSWORD`: 'Lupa Password'
	 * - `OtpPurpose.ACCOUNT`: 'Akun'
	 * - `OtpPurpose.ACCOUNT_CHANGE_PASSWORD`: 'Ubah Kata Sandi'
	 * - Any other value: 'OTP'
	 */
	private _generateOtpPurpose(purpose: OtpPurpose): string {
		switch (purpose) {
			case OtpPurpose.AUTH:
				return "Auth";
			case OtpPurpose.AUTH_FORGOT_PASSWORD:
				return "Lupa Password";
			case OtpPurpose.ACCOUNT:
				return "Akun";
			case OtpPurpose.ACCOUNT_CHANGE_PASSWORD:
				return "Ubah Kata Sandi";
			default:
				return "OTP";
		}
	}
}
