import { FieldInterface } from "./FieldInterfaces";

export interface SelectedStateProps {
  id: string;
  templateName: string;
  fields: FieldInterface[];
}

export interface RenderFieldProps {
  field: FieldInterface;
  membersList: any[];
  setMembersList: (membersList: any[]) => void;
}
