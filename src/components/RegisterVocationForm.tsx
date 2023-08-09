import { Button } from '@chakra-ui/react';

import { useVocations } from '@/hooks/useVocations';
import { Employee } from '@/interfaces/Employee';
import { Vocation } from '@/interfaces/Vocation';
import styles from '@/styles/components/RegisterVocationForm.module.scss';
import { MONTH_NAMES_SHORT, WEEKDAYS_NAME_SHORT } from '@/utils/CalendarUtils';
import { getDateStringFromDate } from '@/utils/DateUtils';
import { OnDateSelected, RangeCalendarPanel } from 'chakra-dayzed-datepicker';
import { differenceInCalendarDays, format } from 'date-fns';
import { useRouter } from 'next/router';

interface RegisterVocationFormProps {
	employee: Employee;
	vocations: Vocation[];
	availableVocationsDays: () => number;
}

function RegisterVocationForm({
	employee,
	vocations,
	availableVocationsDays,
}: RegisterVocationFormProps) {
	const { updateSelectedDates, selectedDates, handleRegisterNewVocation } =
		useVocations();
	const router = useRouter();

	const refreshServerSidePropsData = () => {
		router.replace(router.asPath);
	};

	const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
		let newDates = [...selectedDates];
		if (selectedDates.length) {
			if (selectedDates.length === 1) {
				let firstTime = selectedDates[0];
				if (firstTime < date) {
					newDates.push(date);
				} else {
					newDates.unshift(date);
				}
				updateSelectedDates(newDates);
				return;
			}

			if (newDates.length === 2) {
				updateSelectedDates([date]);
				return;
			}
		} else {
			newDates.push(date);
			updateSelectedDates(newDates);
		}
	};

	function handleCleanCalendar() {
		updateSelectedDates([]);
	}

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await handleRegisterNewVocation({
			employee,
			vocations,
			availableVocationsDays: availableVocationsDays(),
			selectedDates,
		});
	}

	return (
		<div className={styles.registerNewVocation}>
			<h2>Cadastrar férias:</h2>
			<form onSubmit={onSubmit}>
				<input
					type='hidden'
					name='initialDate'
					value={getDateStringFromDate(selectedDates[0])}
				/>
				<input
					type='hidden'
					name='finalDate'
					value={getDateStringFromDate(selectedDates[1])}
				/>

				<RangeCalendarPanel
					selected={selectedDates}
					dayzedHookProps={{
						showOutsideDays: false,
						onDateSelected: handleOnDateSelected,
						selected: selectedDates,
						monthsToDisplay: 2,
						minDate: new Date(),
					}}
					configs={{
						dateFormat: 'MM/dd/yyyy',
						monthNames: MONTH_NAMES_SHORT,
						dayNames: WEEKDAYS_NAME_SHORT,
						firstDayOfWeek: 0,
					}}
					propsConfigs={{
						dayOfMonthBtnProps: {
							defaultBtnProps: {
								color: 'var(--light-text)',
								_hover: {
									background: 'var(--secondary)',
									color: 'var(--primary)',
								},
							},
							isInRangeBtnProps: {
								color: 'var(--secondary)',
								background: 'var(--primary)',
							},
							selectedBtnProps: {
								background: 'var(--secondary)',
								color: 'var(--primary) !important',
							},
							todayBtnProps: {
								border: '2px solid var(--secondary)',
								color: 'var(--secondary)',
								textDecoration: 'underline',
								opacity: 1,
							},
						},
					}}
				/>

				<div className={styles.newVocationResume}>
					<span>Data de início:</span>
					<p>
						{selectedDates[0]
							? format(selectedDates[0], 'dd/MM/yyyy')
							: 'Selecione uma data'}
					</p>

					<span>Data de fim:</span>
					<p>
						{selectedDates[1]
							? format(selectedDates[1], 'dd/MM/yyyy')
							: 'Selecione uma data'}
					</p>

					<span>Quantidade:</span>
					<p>
						{selectedDates[1]
							? differenceInCalendarDays(
									selectedDates[1],
									selectedDates[0]
							  ) + 1
							: 0}
						{' Dias'}
					</p>

					<Button
						variant={'outline'}
						marginEnd={'0.5rem'}
						onClick={handleCleanCalendar}
					>
						Limpar
					</Button>

					<Button
						background={'var(--primary)'}
						marginEnd={'0.5rem'}
						type='submit'
					>
						Cadastrar férias
					</Button>
				</div>
			</form>
		</div>
	);
}

export { RegisterVocationForm };
