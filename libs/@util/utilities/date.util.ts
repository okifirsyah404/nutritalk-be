/**
 * A utility class for date-related operations.
 */
class DateUtils {
	/**
	 * Calculates the age difference between the current date and the provided date.
	 *
	 * @param date - The date from which to calculate the age.
	 * @returns A promise that resolves to an object containing the age difference in years, months, days, hours, minutes, and seconds.
	 *
	 * @example
	 * ```typescript
	 * const birthDate = new Date('2000-01-01');
	 * const age = await countAge(birthDate);
	 * console.log(age); // { year: 23, month: 9, day: 15, hour: 10, minute: 30, second: 45 }
	 * ```
	 */
	static countAge(date: Date): Promise<{
		year: number;
		month: number;
		day: number;
		hour: number;
		minute: number;
		second: number;
	}> {
		return new Promise((resolve) => {
			const now = new Date();
			const diff = now.getTime() - date.getTime();

			const year = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
			const month = Math.floor(
				(diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30),
			);
			const day = Math.floor(
				((diff % (1000 * 60 * 60 * 24 * 365)) % (1000 * 60 * 60 * 24 * 30)) /
					(1000 * 60 * 60 * 24),
			);
			const hour = Math.floor(
				(((diff % (1000 * 60 * 60 * 24 * 365)) % (1000 * 60 * 60 * 24 * 30)) %
					(1000 * 60 * 60 * 24)) /
					(1000 * 60 * 60),
			);
			const minute = Math.floor(
				((((diff % (1000 * 60 * 60 * 24 * 365)) % (1000 * 60 * 60 * 24 * 30)) %
					(1000 * 60 * 60 * 24)) %
					(1000 * 60 * 60)) /
					(1000 * 60),
			);
			const second = Math.floor(
				(((((diff % (1000 * 60 * 60 * 24 * 365)) % (1000 * 60 * 60 * 24 * 30)) %
					(1000 * 60 * 60 * 24)) %
					(1000 * 60 * 60)) %
					(1000 * 60)) /
					1000,
			);

			resolve({
				year,
				month,
				day,
				hour,
				minute,
				second,
			});
		});
	}
}

export default DateUtils;
