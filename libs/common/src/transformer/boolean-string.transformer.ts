export const booleanStringTransformer = ({
	value,
}: {
	value: string;
}): boolean | undefined => {
	if (value === "1" || value.toLowerCase() === "true") return true;
	if (value === "0" || value.toLowerCase() === "false") return false;
	return undefined;
};
