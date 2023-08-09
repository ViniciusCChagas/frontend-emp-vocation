import { useEmployee } from '@/hooks/useEmployees';
import { Employee } from '@/interfaces/Employee';
import { Avatar, Button, Td, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface EmployeesTableItemProps {
	employee: Employee;
}

function EmployeesTableItem({ employee }: EmployeesTableItemProps) {
	const { openModalEditEmplyee } = useEmployee();
	const router = useRouter();

	const admissinDate = new Date(employee.admissionDate).toLocaleDateString('pt-BR');

	function handleEditEmployeeClick() {
		openModalEditEmplyee(employee);
	}

	return (
		<Tr>
			<Td>
				<Avatar
					bg='var(--primary)'
					color={'var(--secondary)'}
					name={employee.name}
				/>
			</Td>
			<Td>
				<p>{employee.name}</p>
				<span style={{ color: 'var(--light-text)' }}>{employee.role}</span>
			</Td>
			<Td>{admissinDate}</Td>
			<Td textAlign={'right'}>
				<Button
					background={'var(--primary)'}
					marginEnd={'0.5rem'}
					onClick={() => {
						router.push(`/employee/${employee._id}`);
					}}
				>
					Cadastrar férias
				</Button>
				<Button
					variant={'outline'}
					borderColor={'var(--primary)'}
					color={'var(--black)'}
					onClick={handleEditEmployeeClick}
				>
					Editar
				</Button>
			</Td>
		</Tr>
	);
}

export { EmployeesTableItem };
