import * as awsS3 from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IProfileEntity } from "@contract";
import { Injectable } from "@nestjs/common";
import { AccountRole } from "@prisma/client";
import { FileUtil } from "@util";
import mime from "mime";
import path from "path";
import { S3StorageService } from "./s3storage.service";

@Injectable()
export class AppS3StorageService {
	constructor(private readonly service: S3StorageService) {}

	/**
	 *
	 * Generates a signed URL for accessing a profile image stored in S3.
	 *
	 * @param profile - The profile object containing the image key.
	 * @returns A promise that resolves to the profile object with the signed URL as the image key.
	 *
	 * @remarks
	 * If the profile does not have an image key, the original profile object is returned.
	 * The signed URL is valid for 3600 seconds (1 hour).
	 *
	 * @example
	 * ```typescript
	 * const profile = { imageKey: 'path/to/image.jpg' };
	 * const updatedProfile = await getProfileSignedUrl(profile);
	 * console.log(updatedProfile.imageKey); // Signed URL
	 * ```
	 *
	 */
	async getProfileSignedUrl(profile: IProfileEntity): Promise<IProfileEntity> {
		const key = profile.imageKey;

		if (!key) {
			return profile;
		}

		const command = new awsS3.GetObjectCommand({
			Bucket: this.service.bucket,
			Key: key,
		});

		const url = await getSignedUrl(this.service.s3Client, command, {
			expiresIn: 3600,
		});

		return { ...profile, imageKey: url };
	}

	/**
	 *
	 * Uploads a profile image to the S3 storage.
	 *
	 * @param `seed` - The seed of the profile.
	 * @param `role` - The role of the profile.
	 * @param `file` - The file object provided by Express.Multer.
	 *
	 * @returns A promise that resolves to the key of the uploaded file in the S3 storage.
	 *
	 */
	async uploadProfileImage({
		seed,
		role,
		file,
	}: {
		seed: string;
		role: AccountRole;
		file: Express.Multer.File;
	}): Promise<string> {
		const key = `${role.toLowerCase()}/${seed}/${seed}.${FileUtil.getExtension(file)}`;

		const tempFilePath = await FileUtil.copyTempFile(file, seed);

		await this.service.uploadObject({
			key,
			body: tempFilePath,
			contentType: file.mimetype,
		});

		void FileUtil.deleteTempFile(tempFilePath);

		return key;
	}

	async uploadFileFromPath({
		seed,
		role,
		filePath,
		deleteAfterUpload,
	}: {
		seed: string;
		role: AccountRole;
		filePath: string;
		deleteAfterUpload?: boolean;
	}): Promise<string> {
		const key = `${role.toLowerCase()}/${seed}/${seed}${path.extname(filePath)}`;

		const contentType = mime.getType(filePath) || "image/*";

		await this.service.uploadObject({
			key,
			body: filePath,
			contentType,
		});

		if (deleteAfterUpload) {
			await FileUtil.deleteTempFile(filePath);
		}

		return key;
	}
}
