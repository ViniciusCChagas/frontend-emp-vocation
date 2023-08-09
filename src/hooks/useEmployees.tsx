import {
	CreateNewEmployeeFormData,
	Employee,
	UpdateEmployeeFormData,
} from '@/interfaces/Employee';
import { api } from '@/services/api';
import { getInitialDate } from '@/utils/DateUtils';
import { showErrorModal, showToast } from '@/utils/SweetAlert';
import { formatISO } from 'date-fns';
import { useRouter } from 'next/router';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

interface EmployeesProviderProps {
	children: ReactNode;
}

interface EmployeesContextData {
	employeeList: Employee[];

	isModalNewEmployeeOpen: boolean;
	openModalNewEmployee: () => void;
	closeModalNewEmployee: () => void;

	isModalEditEmployeeOpen: boolean;
	openModalEditEmplyee: (employee: Employee) => void;
	closeModalEditEmployee: () => void;

	selectedEmployee: Employee;
	updateEmployeeToList: (employee: Employee[]) => void;

	createNewEmployee: (data: CreateNewEmployeeFormData) => Promise<void>;
	deleteSelectedEmployee: () => Promise<void>;
	updateEmployee: (data: UpdateEmployeeFormData) => Promise<void>;
}

const EmployeeContext = createContext<EmployeesContextData>({} as EmployeesContextData);

export const EmployeeProvider = function ({ children }: EmployeesProviderProps) {
	const [employeeList, setEmployeeList] = useState<Employee[]>([]);
	const [selectedEmployee, setSelectedEmployee] = useState<Employee>({} as Employee);

	const [isModalNewEmployeeOpen, setIsModalNewEmployeeOpen] = useState(false);
	const [isModalEditEmployeeOpen, setIsModalEditEmployeeOpen] = useState(false);

	const router = useRouter();

	const refreshServerSidePropsData = () => {
		router.replace(router.asPath);
	};

	useEffect(() => {
		refreshServerSidePropsData();
	}, [employeeList]);

	function openModalNewEmployee() {
		setIsModalNewEmployeeOpen(true);
	}

	function closeModalNewEmployee() {
		setIsModalNewEmployeeOpen(false);
	}

	function openModalEditEmplyee(employee: Employee) {
		setSelectedEmployee(employee);
		setIsModalEditEmployeeOpen(true);
	}

	function closeModalEditEmployee() {
		setIsModalEditEmployeeOpen(false);
		setSelectedEmployee({} as Employee);
	}

	function updateEmployeeToList(employee: Employee[]) {
		setEmployeeList([...employeeList, ...employee]);
	}

	async function createNewEmployee(data: CreateNewEmployeeFormData) {
		try {
			const admissionDate = new Date(data.admissionDate + ' 00:00:00');

			const response = await api.post('/employee', {
				name: data.name,
				role: data.role,
				admissionDate: formatISO(getInitialDate(admissionDate)),
			});

			const newEmployeeList = [...employeeList, response.data.employee as Employee];

			updateEmployeeToList(newEmployeeList);

			showToast('Sucesso!', 'Funcionário cadastrado com sucesso!', 'success');
		} catch (error) {
			console.log(error);

			showErrorModal(
				'Ops!',
				'Ocorreu um problema ao realizar a edição do funcionario!'
			);
		} finally {
			closeModalNewEmployee();
		}
	}

	async function updateEmployee(data: UpdateEmployeeFormData) {
		try {
			const admissionDate = new Date(data.admissionDate + ' 00:00:00');

			const response = await api.put(`/employee/${data._id}`, {
				name: data.name,
				role: data.role,
				admissionDate: formatISO(getInitialDate(admissionDate)),
			});

			const newEmployeeList = [
				...employeeList,
				response.data.newEmployee as Employee,
			];

			updateEmployeeToList(newEmployeeList);

			showToast('Sucesso!', 'Funcionário editado com sucesso!', 'success');
		} catch (error) {
			console.log(error);

			showErrorModal(
				'Ops!',
				'Ocorreu um problema ao realizar a edição do funcionario!'
			);
		} finally {
			closeModalEditEmployee();
		}
	}

	async function deleteSelectedEmployee() {
		try {
			await api.delete(`/employee/${selectedEmployee._id}`);

			const newEmployeeList = employeeList.filter(
				(employee) => employee._id !== selectedEmployee._id
			);

			updateEmployeeToList(newEmployeeList);

			showToast('Sucesso!', 'Funcionário deletado com sucesso!', 'success');
		} catch (error) {
			console.log(error);

			showErrorModal(
				'Ops!',
				'Ocorreu um problema ao realizar a exclusão do funcionario!'
			);
		}
	}

	return (
		<EmployeeContext.Provider
			value={{
				employeeList,
				updateEmployeeToList,

				isModalNewEmployeeOpen,
				openModalNewEmployee,
				closeModalNewEmployee,

				isModalEditEmployeeOpen,
				openModalEditEmplyee,
				closeModalEditEmployee,

				selectedEmployee,
				createNewEmployee,
				deleteSelectedEmployee,
				updateEmployee,
			}}
		>
			{children}
		</EmployeeContext.Provider>
	);
};

export function useEmployee() {
	const context = useContext(EmployeeContext);

	return context;
}
