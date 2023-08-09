import { Employee } from '@/interfaces/Employee';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { EmployeesTableItem } from './EmployeesTableItem';

interface EmployeesTableProps {
	employees: Employee[];
}

function EmployeesTable({ employees }: EmployeesTableProps) {
	return (
		<TableContainer>
			<Table variant={'simple'}>
				<Thead>
					<Tr>
						<Th>#</Th>
						<Th>Nome/Cargo</Th>
						<Th>Data de Contratação</Th>
						<Th textAlign={'right'}>Ações</Th>
					</Tr>
				</Thead>
				<Tbody>
					{employees.length === 0 && (
						<Tr>
							<Th colSpan={4} textAlign={'center'}>
								Nenhum funcionário encontrado
							</Th>
						</Tr>
					)}

					{employees.map((employee, index) => (
						<EmployeesTableItem key={index} employee={employee} />
					))}
				</Tbody>
			</Table>
		</TableContainer>
	);
}
export { EmployeesTable };
