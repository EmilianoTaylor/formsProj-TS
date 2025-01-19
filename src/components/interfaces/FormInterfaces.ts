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

export interface RenderFieldComponentProps {
  field: {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    options?: string[];
  };
  membersList: string[];
  setMembersList: (membersList: string[]) => void;
}