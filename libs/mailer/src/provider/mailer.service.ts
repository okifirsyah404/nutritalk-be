import { Inject, Injectable, Logger } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { MAILER_MODULE_OPTIONS } from "../constant/di.key";
import { MailerOptions } from "../interface/mailer.interface";

@Injectable()
export class MailerService {
	constructor(
		@Inject(MAILER_MODULE_OPTIONS) private readonly options: MailerOptions,
	) {
		this._connectMailServer();

		if (!this.options.maxRetryAttempts) {
			this.options.maxRetryAttempts = 1;
		}
	}

	private readonly logger = new Logger(MailerService.name);

	/**
	 *
	 * The transporter used to send emails to the mail server.
	 *
	 * @private
	 *
	 * */
	private transporter:
		| nodemailer.Transporter<SMTPTransport.SentMessageInfo>
		| undefined;

	/**
	 *
	 * The number of retry attempts made to connect to the mail server.
	 *
	 * @private
	 *
	 * */
	private currentRetryAttempts = 0;

	/**
	 * Establishes a connection to the mail server using the provided SMTP options.
	 *
	 * This method initializes the `transporter` with the SMTP options and verifies the connection.
	 * If the connection fails, it logs the error messages and attempts to check the connection status.
	 * If the connection is successful, it logs a confirmation message.
	 *
	 * @private
	 */
	private _connectMailServer(): void {
		this.transporter = nodemailer.createTransport(this.options.smtpOptions);

		this.transporter.verify((err) => {
			if (err) {
				this.logger.fatal(err.message);
				this.logger.fatal("Email Service: Not Connected");
				this._checkConnection();
			} else {
				this.logger.log("Email Service: Connected");
			}
		});
	}

	/**
	 * Checks the current connection status and handles retry attempts.
	 * If the maximum number of retry attempts is reached, logs an error message.
	 * Otherwise, increments the retry attempt counter, logs a retry message,
	 * and schedules a reconnection attempt after a delay.
	 *
	 * @private
	 * @returns {void}
	 */
	private _checkConnection(): void {
		if (
			this.options.maxRetryAttempts &&
			this.currentRetryAttempts >= this.options.maxRetryAttempts
		) {
			this.logger.error(
				`Email Service: Max retry attempts ${this.options.maxRetryAttempts} reached. Please check your SMTP Options.`,
			);
			return;
		} else {
			this.currentRetryAttempts++;
			this.logger.log(
				`Email Service: Retrying connection. Retry attempt ${this.currentRetryAttempts}...`,
			);
			setTimeout(() => this._connectMailServer(), 5000);
		}
	}

	/**
	 * Sends an email using the configured transporter.
	 *
	 * @param mailOptions - The email options to be sent.
	 * @returns A promise that resolves to the sent message info,
	 *          false if there was an error, or void if the transporter is not connected.
	 *
	 * @throws Will log an error message if the transporter is not connected or if there is an error sending the email.
	 */
	async sendMail(
		mailOptions: nodemailer.SendMailOptions,
	): Promise<nodemailer.SentMessageInfo | boolean | void> {
		if (!this.transporter) {
			this.logger.error("Email Service: Not Connected");
			return;
		}

		return await this.transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				this.logger.error(err.message);
				return false;
			}
			this.logger.log(`Email Service: Message sent: ${info.messageId}`);
			return info;
		});
	}
}
