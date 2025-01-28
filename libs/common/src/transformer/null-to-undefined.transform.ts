export const nullToUndefined = <T>({
	value,
}: {
	value: T | null;
}): T | undefined => (value === null ? undefined : value);
