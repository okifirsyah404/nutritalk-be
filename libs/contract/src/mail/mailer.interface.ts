import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface MailerOptions {
	imports?: any[];
	isGlobal?: boolean;
	maxRetryAttempts?: number;
	smtpOptions?: SMTPTransport | SMTPTransport.Options;
}

export interface MailerAsyncOptions {
	isGlobal?: boolean;
	inject?: any[];
	imports?: any[];
	useFactory?: (...args: any[]) => Promise<MailerOptions> | MailerOptions;
}
