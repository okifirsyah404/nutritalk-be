import { TempUploadPath } from "@constant/constant";
import * as fs from "fs";
import * as path from "path";

/**
 * A utility class for handling file operations such as copying, deleting, and extracting file information.
 */
class FileUtils {
	/**
	 * Copies a temporary file to a specified directory.
	 *
	 * @param file - The file object provided by Express.Multer.
	 * @param seed - A string used to generate the file name.
	 * @returns A promise that resolves to the path of the copied file.
	 *
	 * @throws Will throw an error if the file cannot be written.
	 */
	static async copyTempFile(
		file: Express.Multer.File,
		seed: string,
	): Promise<string> {
		const dir = TempUploadPath.TEMP_UPLOAD_PATH;

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir, { recursive: true });
		}

		const filePath = path.join(
			dir,
			`${seed}.${file.originalname.split(".").pop()}`,
		);

		await fs.promises.writeFile(filePath, file.buffer);

		return filePath;
	}

	/**
	 * Deletes a temporary file at the specified file path.
	 *
	 * @param filePath - The path to the file to be deleted.
	 * @returns A promise that resolves when the file has been deleted.
	 */
	static async deleteTempFile(filePath: string): Promise<void> {
		await fs.promises.unlink(filePath);
	}

	/**
	 * Extracts the file extension from the original filename of an uploaded file.
	 *
	 * @param file - The uploaded file object provided by Multer.
	 * @returns The file extension as a string.
	 */
	static getExtension(file: Express.Multer.File): string {
		return file.originalname.split(".").pop();
	}

	/**
	 * Retrieves the original name of the uploaded file.
	 *
	 * @param file - The file object provided by Multer middleware.
	 * @returns The original name of the file.
	 */
	static getFileName(file: Express.Multer.File): string {
		return file.originalname;
	}
}

export default FileUtils;
