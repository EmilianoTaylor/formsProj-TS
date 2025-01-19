import { FieldProps } from 'formik';

export interface FieldComponentProps {
  field: {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    options?: string[];
  };
  props?: FieldProps;
}

export interface DateFieldComponentProps {
  field: {
    name: string;
    label: string;
  };
}

export interface TimeFieldComponentProps {
  field: {
    name: string;
    label: string;
  };
}

export interface NumberFieldComponentProps {
  field: {
    name: string;
    label: string;
    placeholder?: string;
  };
}

export interface RadioFieldComponentProps {
  field: {
    name: string;
    options: string[];
  };
  props?: FieldProps;
}

export interface SelectFieldComponentProps {
  field: {
    name: string;
    label: string;
    options: string[];
  };
  props?: FieldProps;
}

export interface CheckboxFieldComponentProps {
  field: {
    name: string;
  };
  props?: FieldProps;
}

export interface TextareaFieldComponentProps {
  field: {
    name: string;
    placeholder?: string;
  };
  props?: FieldProps;
}

export interface MembersFieldComponentProps {
	field: {
    name: string;
    label: string;
    placeholder?: string;
    type: string;
    options: string[];
  };
  member: string;
  setMember: (member: string) => void;
  membersList: string[];
  setMembersList: (membersList: string[]) => void;
  handleAddMember: () => void;
  handleRemoveMember: (index: number) => void;
}