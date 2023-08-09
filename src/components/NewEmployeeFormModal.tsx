import { useEmployee } from '@/hooks/useEmployees';
import { CreateNewEmployeeFormData } from '@/interfaces/Employee';
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

function NewEmployeeFormModal() {
	const [isLoading, setIsLoading] = useState(false);
	const { isModalNewEmployeeOpen, closeModalNewEmployee, createNewEmployee } =
		useEmployee();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateNewEmployeeFormData>();

	async function onSubmit(data: CreateNewEmployeeFormData) {
		setIsLoading(true);
		await createNewEmployee(data);
		setIsLoading(false);
	}

	return (
		<Modal
			isOpen={isModalNewEmployeeOpen}
			onClose={() => {
				closeModalNewEmployee();
				reset();
			}}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader background={'var(--secondary)'} color={'var(--white)'}>
					Cadastro de Funcionário
					<ModalCloseButton />
				</ModalHeader>

				<form onSubmit={handleSubmit((data) => onSubmit(data))}>
					<ModalBody>
						<FormControl
							marginBottom={'1rem'}
							marginTop={'1rem'}
							isInvalid={errors.name ? true : false}
						>
							<FormLabel>Nome completo:</FormLabel>
							<Input
								type='text'
								{...register('name', { ...inputConfig['name'] })}
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
								{...register('role', { ...inputConfig['role'] })}
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
								})}
							/>
							<FormErrorMessage>
								{errors.admissionDate && errors.admissionDate.message}
							</FormErrorMessage>
						</FormControl>
					</ModalBody>

					<ModalFooter marginTop={'2rem'} marginBottom={'1rem'}>
						<Button
							type='submit'
							background={'var(--primary)'}
							width={'70%'}
							margin={'auto'}
							isLoading={isLoading}
							loadingText='Cadastrando...'
						>
							Cadastrar
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}
export { NewEmployeeFormModal };
