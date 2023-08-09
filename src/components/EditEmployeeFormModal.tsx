import { useEmployee } from '@/hooks/useEmployees';
import { UpdateEmployeeFormData } from '@/interfaces/Employee';
import { getDateStringFromDate } from '@/utils/DateUtils';
import { showDangerConfirmModal } from '@/utils/SweetAlert';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const inputConfig = {
	_id: {
		required: {
			value: true,
			message: 'Campo obrigatório',
		},
	},
	name: {
		required: {
			value: true,
			message: 'Campo obrigatório',
		},
		minLength: {
			value: 3,
			message: 'Mínimo de 3 caracteres',
		},
		maxLength: {
			value: 255,
			message: 'Máximo de 255 caracteres',
		},
	},
	role: {
		required: {
			value: true,
			message: 'Campo obrigatório',
		},
		minLength: {
			value: 3,
			message: 'Mínimo de 3 caracteres',
		},
		maxLength: {
			value: 255,
			message: 'Máximo de 255 caracteres',
		},
	},
	admissionDate: {
		required: {
			value: true,
			message: 'Campo obrigatório',
		},
	},
};

function EditEmployeeFormModal() {
	const [isLoading, setIsLoading] = useState(false);
	const {
		isModalEditEmployeeOpen,
		closeModalEditEmployee,
		employeeList,
		selectedEmployee,
		updateEmployee,
		deleteSelectedEmployee,
	} = useEmployee();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<UpdateEmployeeFormData>();

	async function onSubmit(data: UpdateEmployeeFormData) {
		setIsLoading(true);
		await updateEmployee(data);
		setIsLoading(false);
	}

	async function handleDeleteEmployee() {
		closeModalEditEmployee();

		const { isDenied } = await showDangerConfirmModal({
			title: 'Atenção!',
			text: 'Você realmente deseja EXCLUIR este funcionário? (Esta ação não poderá ser desfeita!)',
			buttonText: 'Excluir Funcionário',
			icon: 'warning',
		});

		if (isDenied) {
			await deleteSelectedEmployee();
		}
	}

	const admissonDate = getDateStringFromDate(new Date(selectedEmployee.admissionDate));

	return (
		<Modal
			isOpen={isModalEditEmployeeOpen}
			onClose={() => {
				closeModalEditEmployee();
				reset();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader background={'var(--secondary)'} color={'var(--white)'}>
					Edição de Funcionário
					<ModalCloseButton />
				</ModalHeader>

				<form onSubmit={handleSubmit((data) => onSubmit(data))}>
					<ModalBody>
						<Input
							type='text'
							{...register('_id', {
								...inputConfig['_id'],
								value: selectedEmployee._id,
							})}
							hidden={true}
						/>
						<FormControl
							marginBottom={'1rem'}
							marginTop={'1rem'}
							isInvalid={errors.name ? true : false}
						>
							<FormLabel>Nome completo:</FormLabel>
							<Input
								type='text'
								{...register('name', {
									...inputConfig['name'],
									value: selectedEmployee.name,
								})}
							/>
							<FormErrorMessage>
								{errors.name && errors.name.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							marginBottom={'1rem'}
							isInvalid={errors.role ? true : false}
						>
							<FormLabel>Cargo:</FormLabel>
							<Input
								type='text'
								{...register('role', {
									...inputConfig['role'],
									value: selectedEmployee.role,
								})}
							/>
							<FormErrorMessage>
								{errors.role && errors.role.message}
							</FormErrorMessage>
						</FormControl>

						<FormControl
							marginBottom={'1rem'}
							isInvalid={errors.admissionDate ? true : false}
						>
							<FormLabel>Data de contratação:</FormLabel>
							<Input
								type='date'
								{...register('admissionDate', {
									...inputConfig['admissionDate'],
									value: admissonDate,
								})}
							/>
							<FormErrorMessage>
								{errors.admissionDate && errors.admissionDate.message}
							</FormErrorMessage>
						</FormControl>
					</ModalBody>

					<ModalFooter marginTop={'2rem'} marginBottom={'1rem'}>
						<Button
							type='button'
							background={'var(--danger)'}
							color={'var(--white)'}
							width={'70%'}
							margin={'auto 0.5rem'}
							onClick={handleDeleteEmployee}
						>
							Excluir funcionário
						</Button>
						<Button
							type='submit'
							background={'var(--primary)'}
							width={'70%'}
							margin={'auto'}
							isLoading={isLoading}
							loadingText='Salvando...'
						>
							Salvar alterações
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
export { EditEmployeeFormModal };
