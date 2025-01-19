import { Field } from "formik";
import { FieldComponentProps } from "./FieldInterfaces";

export interface RenderFieldProps {
  field: FieldComponentProps;
  membersList: string[];
  setMembersList: (membersList: string[]) => void;
}
