import { Employee } from '@/interfaces/Employee';
import { Avatar } from '@chakra-ui/react';
import styles from '../styles/components/EmployeeProfile.module.scss';

interface EmployeeProfileProps {
	employee: Employee;
}

function EmployeeProfile({ employee }: EmployeeProfileProps) {
	const admissionDate = new Date(employee.admissionDate).toLocaleDateString('pt-BR');

	return (
		<div className={styles.profile}>
			<div className={styles.employeeAvatar}>
				<Avatar
					name={employee.name}
					size={'xl'}
					bg={'var(--secondary)'}
					color={'var(--primary)'}
				/>
			</div>

			<div className={styles.employeeData}>
				<h2>{employee.name}</h2>
				<h3>{employee.role}</h3>
				<p>Data da contratação: {admissionDate}</p>
			</div>
		</div>
	);
}

export { EmployeeProfile };
