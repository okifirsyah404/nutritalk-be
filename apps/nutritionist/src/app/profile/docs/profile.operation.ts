import { ApiOperationOptions } from "@nestjs/swagger";

export abstract class ProfileOperationDocs {
	static readonly GET_PROFILE: ApiOperationOptions = {
		summary: "Profile",
		description:
			"Http endpoint for getting the profile of a nutritionist.\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of profile information",
	};

	static readonly UPDATE_PROFILE: ApiOperationOptions = {
		summary: "Update profile",
		description:
			"Http endpoint for updating the profile of a nutritionist.\n\nRequest body:\n- name: (required) string\n- phoneNumber: (required) string\n- address: (required) string\n- placeOfBirth: (required) string\n- dateOfBirth: (required) string\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information",
	};

	static readonly UPLOAD_IMAGE_PROFILE: ApiOperationOptions = {
		summary: "Upload image",
		description:
			"Http endpoint for uploading a profile image.\n\nRequest body:\n- image: (required) file\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated profile information",
	};

	static readonly SET_AVAILABILITY: ApiOperationOptions = {
		summary: "Set availability",
		description:
			"Http endpoint for setting the availability of a nutritionist.\n\nRequest body:\n- availability: (required) object\n\nResponse:\n- status: string\n- statusCode: number\n- message: string\n- data: object of updated availability",
	};
}
