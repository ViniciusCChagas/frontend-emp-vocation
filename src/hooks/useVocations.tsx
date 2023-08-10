import { Employee } from '@/interfaces/Employee';
import { Vocation } from '@/interfaces/Vocation';
import { api } from '@/services/api';
import { getFinalDate, getInitialDate } from '@/utils/DateUtils';
import { showErrorModal, showToast } from '@/utils/SweetAlert';
import {
	areIntervalsOverlapping,
	differenceInCalendarDays,
	formatISO,
	isPast,
} from 'date-fns';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useState } from 'react';

interface VocationsProviderProps {
	children: ReactNode;
}

interface RegisterNewVocationParams {
	employee: Employee;
	vocations: Vocation[];
	selectedDates: Date[];
	availableVocationsDays: number;
}

interface VocationsContextData {
	selectedDates: Date[];
	updateSelectedDates: (dates: Date[]) => void;
	deleteVocation: (vocation: Vocation) => Promise<void>;
	handleRegisterNewVocation: (params: RegisterNewVocationParams) => Promise<void>;
}

const VocationsContext = createContext<VocationsContextData>({} as VocationsContextData);

export const VocationsProvider = function ({ children }: VocationsProviderProps) {
	const [selectedDates, setSelectedDates] = useState<Date[]>([]);
	const router = useRouter();

	const refreshServerSidePropsData = () => {
		router.replace(router.asPath);
	};

	function updateSelectedDates(dates: Date[]) {
		setSelectedDates(dates);
	}

	async function deleteVocation(vocation: Vocation) {
		try {
			await api.delete(`/vocation/${vocation?._id}`);

			refreshServerSidePropsData();

			showToast('Sucesso!', 'Agendamento deletado com sucesso!', 'success');
		} catch (error) {
			console.log(error);

			showErrorModal(
				'Ops!',
				'Ocorreu um problema ao realizar a exclusão do agendamento!'
			);
		}
	}

	async function handleRegisterNewVocation({
		employee,
		vocations,
		selectedDates,
		availableVocationsDays,
	}: RegisterNewVocationParams) {
		if (!selectedDates[0]) {
			showToast('', 'Selecione a data inicial do período!', 'error');
			return;
		}

		if (!selectedDates[1]) {
			showToast('', 'Selecione a data final período!', 'error');
			return;
		}

		const incommingVocations = vocations.filter(
			(vocation) => isPast(new Date(vocation.initialDate)) === false
		);

		const initialDate = getInitialDate(selectedDates[0]);
		const finalDate = getFinalDate(selectedDates[1]);

		const totalDaysSelected = differenceInCalendarDays(finalDate, initialDate) + 1;

		if (totalDaysSelected > availableVocationsDays) {
			showToast(
				'',
				'Numero de dias selecionados é maior do que os dias disponiveis!',
				'error'
			);
			return;
		}

		const newAvailableDays = availableVocationsDays - totalDaysSelected;

		const isOverlappingSomeVocation = incommingVocations.some((vocation) => {
			const vocationInitialDate = getInitialDate(new Date(vocation.initialDate));
			const vocationFinalDate = getFinalDate(new Date(vocation.finalDate));

			if (isPast(vocationInitialDate)) {
				return false;
			}

			const isOverlapping = areIntervalsOverlapping(
				{ start: initialDate, end: finalDate },
				{ start: vocationInitialDate, end: vocationFinalDate }
			);

			return isOverlapping;
		});

		const isSomeVocationPeriodGraterThan14Days = incommingVocations.some(
			(vocation) => {
				const vocationInitialDate = getInitialDate(
					new Date(vocation.initialDate)
				);
				const vocationFinalDate = getFinalDate(new Date(vocation.finalDate));

				const totalDays =
					differenceInCalendarDays(vocationFinalDate, vocationInitialDate) + 1;

				return totalDays >= 14;
			}
		);

		if (
			totalDaysSelected < 14 &&
			!isSomeVocationPeriodGraterThan14Days &&
			newAvailableDays < 14
		) {
			showToast(
				'',
				'Você deve ter ao menos um período de férias maior ou igual a 14 dias agendado!',
				'error'
			);
			return;
		}

		if (incommingVocations.length === 2 && newAvailableDays > 0) {
			showToast(
				'',
				'Você pode ter no máximo 3 agendamentos, certifique-se de que não sobrem dias a serem agendados!',
				'error'
			);
			return;
		}

		if (newAvailableDays > 0 && newAvailableDays < 5) {
			showToast(
				'',
				'Você deve ter ao menos 5 dias disponiveis para agendar!',
				'error'
			);
			return;
		}

		if (isOverlappingSomeVocation) {
			showToast(
				'',
				'O período de férias não pode se sobrepor a outro período de férias!',
				'error'
			);
			return;
		}

		if (initialDate < new Date()) {
			showToast('', 'A data inicial não pode ser menor que a data atual!', 'error');
			return;
		}

		if (initialDate > finalDate) {
			showToast('', 'A data inicial não pode ser maior que a data final!', 'error');
			return;
		}

		if (totalDaysSelected < 5) {
			showToast('', 'O período de férias deve ser maior que 5 dias!', 'error');
			return;
		}

		try {
			const response = await api.post('/vocation', {
				employeeId: employee._id,
				initialDate: formatISO(initialDate, {
					representation: 'date',
				}),
				finalDate: formatISO(finalDate, {
					representation: 'date',
				}),
			});

			console.log(response);
			refreshServerSidePropsData();

			showToast('Sucesso!', 'Férias cadastrada com sucesso!', 'success');
			updateSelectedDates([]);
		} catch (error) {
			console.log(error);
			showErrorModal('Ops!', 'Ocorreu um problema ao cadastrar férias!');
		}
	}

	return (
		<VocationsContext.Provider
			value={{
				deleteVocation,
				selectedDates,
				updateSelectedDates,
				handleRegisterNewVocation,
			}}
		>
			{children}
		</VocationsContext.Provider>
	);
};

export function useVocations() {
	const context = useContext(VocationsContext);

	return context;
}
