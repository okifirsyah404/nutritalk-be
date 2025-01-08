import { PrismaClient } from "@prisma/client";
import * as permissionRawData from "../raw/permission.json";

async function seedPermission(prisma: PrismaClient): Promise<void> {
	const nutritionistPermissionData = permissionRawData.nutritionist;
	const patientPermissionData = permissionRawData.patient;

	try {
		console.log("------------- Deleting all permission data... -------------");

		await prisma.basePermission.deleteMany();

		console.log("------------- Deleted all permission data -------------");
		console.log("------------- Seeding permission data... -------------");

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

		console.log("------------- Seeded permission data -------------");
	} catch (error) {
		console.error("Error seeding permission data", error);
	}
}

export default seedPermission;
