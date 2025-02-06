import bcrypt from "bcrypt";
import crypto from "crypto";

export function generateRandomString(length: number): string {
	const buffer = crypto.randomBytes(length / 2);

	return buffer.toString("hex");
}

export async function hashPassword(password: string): Promise<string> {
	const saltRounds: number = parseInt(process.env.SALT_ROUNDS || "8");
	const salt = await bcrypt.genSalt(saltRounds);
	return await bcrypt.hash(password, salt);
}
