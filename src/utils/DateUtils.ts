export function getDateStringFromDate(date: Date | null) {
	if (!date) return '';
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString();
	return `${year}-${month}-${day}`;
}

export function getInitialDate(date: Date) {
	date.setHours(0, 0, 0, 0);

	return date;
}
export function getFinalDate(date: Date) {
	date.setHours(23, 59, 59, 999);

	return date;
}
