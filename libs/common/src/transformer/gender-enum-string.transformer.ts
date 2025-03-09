import { Gender } from "@prisma/client";

export const genderEnumStringTransformer = ({
	value,
}: {
	value: string;
}): Gender | undefined => {
	if (value.toLowerCase() === Gender.MALE.toLowerCase()) return Gender.MALE;
	if (value.toLowerCase() === Gender.FEMALE.toLowerCase()) return Gender.FEMALE;

	return undefined;
};
