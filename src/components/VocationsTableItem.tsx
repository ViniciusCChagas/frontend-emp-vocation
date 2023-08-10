import { Button, Th, Tr } from '@chakra-ui/react';
import { differenceInCalendarDays, isPast, isWithinInterval } from 'date-fns';

import { useVocations } from '@/hooks/useVocations';
import { Vocation } from '@/interfaces/Vocation';
import styles from '@/styles/components/VocationsTableItem.module.scss';
import { getFinalDate, getInitialDate } from '@/utils/DateUtils';
import { showDangerConfirmModal } from '@/utils/SweetAlert';

interface VocationTableItemProps {
	vocation: Vocation;
}

function VocationsTableItem({ vocation }: VocationTableItemProps) {
	const { deleteVocation } = useVocations();

	const isoInitialDate = vocation.initialDate.split('T').join(' ').split('Z').join('');
	const isoFinalDate = vocation.finalDate.split('T').join(' ').split('Z').join('');

	const initialDate = getInitialDate(new Date(isoInitialDate));
	const finalDate = getFinalDate(new Date(isoFinalDate));

	const daysDiff = differenceInCalendarDays(finalDate, initialDate) + 1;

	const isInPast = isPast(finalDate);
	const today = new Date();
	const isOnVocation = isWithinInterval(today, {
		start: initialDate,
		end: finalDate,
	});

	async function handleDeleteVocation(vocation: Vocation) {
		const { isDenied } = await showDangerConfirmModal({
			title: 'Atenção!',
			text: 'Você realmente deseja EXCLUIR este agendamento de férias? (Esta ação não poderá ser desfeita!)',
			buttonText: 'Excluir Agendamento',
			icon: 'warning',
		});

		if (isDenied) {
			await deleteVocation(vocation);
		}
	}

	return (
		<Tr
			style={{ ...getLineStyle(isInPast, isOnVocation) }}
			className={styles.vocationTableItem}
		>
			<Th>{initialDate.toLocaleDateString('pt-BR')}</Th>
			<Th>{finalDate.toLocaleDateString('pt-BR')}</Th>
			<Th>{daysDiff} Dias</Th>
			<Th>{getStatus(isInPast, isOnVocation)}</Th>
			<Th textAlign={'right'}>
				<Button
					colorScheme='red'
					size={'sm'}
					hidden={isInPast || isOnVocation}
					onClick={() => {
						handleDeleteVocation(vocation);
					}}
				>
					Cancelar férias
				</Button>
			</Th>
		</Tr>
	);
}

function getStatus(isInPast: boolean, isOnVocation: boolean) {
	if (isInPast) {
		return 'Concluida';
	} else if (isOnVocation) {
		return 'Em andamento';
	} else {
		return 'Agendada';
	}
}

function getLineStyle(isInPast: boolean, isOnVocation: boolean) {
	if (isInPast) {
		return {
			opacity: '0.5',
			fontStyle: 'italic',
			textDecoration: 'line-through',
		};
	}

	if (isOnVocation) {
		return {
			color: 'green',
		};
	}
}

export { VocationsTableItem };
