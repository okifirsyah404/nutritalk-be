import { ConsultationType } from "@prisma/client";

export const consultationTypeEnumStringTransformer = ({
	value,
}: {
	value: string;
}): ConsultationType | undefined => {
	if (value.toLowerCase() === ConsultationType.ONLINE.toLowerCase())
		return ConsultationType.ONLINE;
	if (value.toLowerCase() === ConsultationType.OFFLINE.toLowerCase())
		return ConsultationType.OFFLINE;

	return undefined;
};
