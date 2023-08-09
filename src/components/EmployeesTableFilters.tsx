import styles from '@/styles/components/EmployeesTableFilters.module.scss';
import { Button, Input } from '@chakra-ui/react';

function EmployeesTableFilter() {
	function handleFilterEmployees(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log('Filtrar funcionários');
	}
	return (
		<>
			<p>Filtros:</p>
			<form onSubmit={handleFilterEmployees} className={styles.filtersForm}>
				<div className={styles.inputGroup}>
					<label htmlFor=''></label>
					<Input
						type='text'
						placeholder='Nome do Funcionário'
						name='employeeName'
					/>
				</div>

				<div className={styles.inputGroup}>
					<Input type='date' name='initialAdmissionDate' />
					<span>até</span>
					<Input type='date' name='finalAdmissionDate' />
				</div>
				<Button background={'var(--primary)'} marginStart={'0.5rem'}>
					Filtrar
				</Button>
			</form>
		</>
	);
}

export { EmployeesTableFilter };
