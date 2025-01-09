import { Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import * as permissionRawData from "../raw/permission.json";

async function seedPermission(prisma: PrismaClient): Promise<void> {
	const logger = new Logger("Permission Seeder");

	const nutritionistPermissionData = permissionRawData.nutritionist;
	const patientPermissionData = permissionRawData.patient;

	try {
		logger.log("Deleting all permission data...");

		await prisma.basePermission.deleteMany();

		logger.log("Deleted all permission data");
		logger.log("Seeding permission data...");

		for (const permission of nutritionistPermissionData) {
			await prisma.basePermission.create({
				data: {
					key: permission.key,
					description: permission.description,
				},
			});
		}

		for (const permission of patientPermissionData) {
			await prisma.basePermission.create({
				data: {
					key: permission.key,
					description: permission.description,
				},
			});
		}

		logger.log("Seeded permission data");
	} catch (error) {
		logger.error("Error seeding permission data", error);
	}
}

export default seedPermission;
