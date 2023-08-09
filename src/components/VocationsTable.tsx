import { Vocation } from '@/interfaces/Vocation';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { VocationsTableItem } from './VocationsTableItem';

import styles from '@/styles/components/VocationsTable.module.scss';

interface VocationTableProps {
	vocations: Vocation[];
}

function VocationsTable({ vocations }: VocationTableProps) {
	return (
		<TableContainer className={styles.vocationTable}>
			<h2>Proximas férias:</h2>
			<Table variant={'simple'}>
				<Thead>
					<Tr padding={'0.5rem'}>
						<Th>Início</Th>
						<Th>Fim</Th>
						<Th>Quantidade</Th>
						<Th>Situação</Th>
						<Th textAlign={'right'}>Ações</Th>
					</Tr>
				</Thead>
				<Tbody>
					{vocations.length === 0 && (
						<Tr>
							<Th colSpan={5} textAlign={'center'}>
								Nenhuma registro de férias encontrado
							</Th>
						</Tr>
					)}

					{vocations.map((vocation, index) => {
						return <VocationsTableItem vocation={vocation} key={index} />;
					})}
				</Tbody>
			</Table>
		</TableContainer>
	);
}

export { VocationsTable };
