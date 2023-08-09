import { Employee } from '@/interfaces/Employee';
import { Vocation } from '@/interfaces/Vocation';
import { differenceInDays, differenceInYears } from 'date-fns';

const MAX_VOCATIONS_PERIODS = 3;

function getAvailableVocationDays(employee: Employee, vocations: Vocation[]) {
	const yearsWorked = differenceInYears(new Date(), new Date(employee.admissionDate));

	const possibleVocationDays = yearsWorked * 30;

	let avaiableVocationsDays = 0;
	if (yearsWorked >= 1) {
		avaiableVocationsDays = vocations.reduce((acc, vocation) => {
			const initialDate = new Date(vocation.initialDate);
			const finalDate = new Date(vocation.finalDate);

			const days = differenceInDays(finalDate, initialDate) + 1;

			return acc - days;
		}, possibleVocationDays);
	}

	return avaiableVocationsDays;
}

export { MAX_VOCATIONS_PERIODS, getAvailableVocationDays };
