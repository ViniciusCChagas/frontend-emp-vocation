import { EditEmployeeFormModal } from '@/components/EditEmployeeFormModal';
import { EmployeesTable } from '@/components/EmployeesTable';
import { NewEmployeeFormModal } from '@/components/NewEmployeeFormModal';
import { useEmployee } from '@/hooks/useEmployees';
import { Employee } from '@/interfaces/Employee';
import { api } from '@/services/api';
import { Button } from '@chakra-ui/react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styles from '../styles/pages/Home.module.scss';

export default function Home({
	employees,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const { openModalNewEmployee, isModalEditEmployeeOpen, isModalNewEmployeeOpen } =
		useEmployee();

	return (
		<div className={styles.container}>
			<header>
				<div className={styles.headerContent}>
					<div color='var(--dark)'>
						<h1>EMP-VOCATION</h1>
						<h2>CONTROLE DE FÉRIAS</h2>
					</div>

					<Button
						margin={'auto 0 auto auto'}
						background={'var(--white)'}
						size={'md'}
						height={'50px'}
						onClick={openModalNewEmployee}
					>
						Adicionar novo funcionário
					</Button>
					{isModalNewEmployeeOpen && <NewEmployeeFormModal />}
					{isModalEditEmployeeOpen && <EditEmployeeFormModal />}
				</div>
			</header>

			<main>
				<header>
					<h2>Funcionários:</h2>
				</header>
				<EmployeesTable employees={employees} />
			</main>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<{
	employees: Employee[];
}> = async () => {
	const res = await api.get('/employee');
	const employees = res.data;

	return { props: { employees } };
};
