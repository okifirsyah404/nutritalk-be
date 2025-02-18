import { FileValidationMessage } from "@constant/message";
import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ImageFileValidationPipe implements PipeTransform {
	// Allowed MIME types for images
	private readonly allowedMimeTypes = [
		"image/jpeg",
		"image/png",
		"image/gif",
		"image/webp",
	];

	// Maximum file size in bytes (10 MB)
	private readonly maxFileSize = 10 * 1024 * 1024;

	transform(file: Express.Multer.File | undefined): Express.Multer.File {
		if (!file) {
			throw new BadRequestException(
				FileValidationMessage.ERR_IMAGE_FILE_REQUIRED,
			);
		}

		// Validate MIME type
		if (!this.allowedMimeTypes.includes(file.mimetype)) {
			throw new BadRequestException(
				FileValidationMessage.ERR_INVALID_IMAGE_FILE_TYPE,
			);
		}

		// Validate file size
		if (file.size > this.maxFileSize) {
			throw new BadRequestException(
				FileValidationMessage.ERR_IMAGE_FILE_SIZE_LIMIT_10_MB,
			);
		}

		return file; // If valid, return the file for further processing
	}
}
