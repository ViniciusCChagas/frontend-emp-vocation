import { CountCard } from '@/components/CountCard';
import { EmployeeProfile } from '@/components/EmployeeProfile';
import { RegisterVocationForm } from '@/components/RegisterVocationForm';
import { VocationsTable } from '@/components/VocationsTable';
import { VocationsProvider } from '@/hooks/useVocations';
import { Employee } from '@/interfaces/Employee';
import { Vocation } from '@/interfaces/Vocation';
import { api } from '@/services/api';
import styles from '@/styles/pages/Employee.module.scss';
import { getAvailableVocationDays } from '@/utils/VocationUtils';
import {
	GetServerSideProps,
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { useCallback } from 'react';

export default function EmployeePage({
	employee,
	vocations,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const availableVocationsDays = useCallback(
		() => getAvailableVocationDays(employee, vocations),
		[vocations]
	);

	return (
		<VocationsProvider>
			<main className={styles.pageContainer}>
				<header>
					<div className={styles.headerContent}>
						<EmployeeProfile employee={employee} />

						<CountCard
							title={'Férias disponiveis:'}
							body={`${availableVocationsDays()} Dias`}
						/>
					</div>
				</header>
				<section className={styles.sectionCard}>
					<VocationsTable vocations={vocations} />
				</section>

				<section className={styles.sectionCard}>
					<RegisterVocationForm
						employee={employee}
						vocations={vocations}
						availableVocationsDays={availableVocationsDays}
					/>
				</section>
			</main>
		</VocationsProvider>
	);
}

export const getServerSideProps: GetServerSideProps<{
	employee: Employee;
	vocations: Vocation[];
}> = async ({ query }: GetServerSidePropsContext) => {
	const employeeId = query.employeeId;

	const employeeResponse = await api.get(`/employee/${employeeId}`);
	const employee = employeeResponse.data;

	const vocationsResponse = await api.get(`/vocation/employee/${employeeId}`);
	const vocations = vocationsResponse.data;

	return { props: { employee, vocations } };
};
