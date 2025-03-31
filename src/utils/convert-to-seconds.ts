export function convertToSeconds(timeStr: string): number {
	const units = timeStr.slice(-1);
	const value = Number.parseInt(timeStr.slice(0, -1));

	switch (units) {
		case "s":
			return value;
		case "m":
			return value * 60;
		case "h":
			return value * 3600;
		default:
			throw new Error("Invalid time unit");
	}
}
