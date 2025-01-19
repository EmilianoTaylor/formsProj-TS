interface Form {
	id: number,
	templateName: string
}

export interface FormListProps {
	forms: Form[];
	handleFormClick: (form: Form) => void;
}

export interface FormCardProps {
	forms: Form[];
	handleFormClick: (form: Form) => void;
	FetchForms: () => void;
}

export interface SelectedFieldProps {
  name: string;
  validation?: {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    min?: number;
    max?: number;
  };
}

export interface SelectedFormProps {
  selectedForm: {
    id: string;
    templateName: string;
    fields: SelectedFieldProps[];
  };
  handleSubmit: (values: { [key: string]: any }) => void;
  renderField: (field: SelectedFieldProps) => React.ReactNode;
}