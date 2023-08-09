interface Employee {
	_id?: string;
	name: string;
	role: string;
	admissionDate: string;
}

interface CreateNewEmployeeFormData {
	name: string;
	role: string;
	admissionDate: Date;
}

interface UpdateEmployeeFormData {
	_id: string;
	name: string;
	role: string;
	admissionDate: Date;
}

export type { CreateNewEmployeeFormData, Employee, UpdateEmployeeFormData };
