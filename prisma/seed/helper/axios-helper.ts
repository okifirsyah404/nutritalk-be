import axios from "axios";
import fs from "fs";
import path from "path";

export async function downloadFile(
	url: string,
	filePath: string,
): Promise<string> {
	if (!fs.existsSync(filePath)) {
		fs.mkdirSync(filePath, { recursive: true });
	}

	const millis = +new Date();
	const fileName = path.join(filePath, `${millis}.jpg`);
	const writer = fs.createWriteStream(fileName);

	const response = await axios({
		url,
		method: "GET",
		responseType: "stream",
	});

	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	response.data.pipe(writer);

	return new Promise((resolve, reject) => {
		writer.on("finish", () => {
			resolve(fileName);
		});
		writer.on("error", reject);
	});
}
