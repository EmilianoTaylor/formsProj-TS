import { FormListProps } from "../interfaces/FormInterfaces";

const FormsList: React.FC<FormListProps> = ({ forms, handleFormClick }) => {
  return (
    <ul>
      {forms.map((form) => (
        <li
          className='formType'
          key={form.id}
          onClick={() => handleFormClick(form)}
        >
          {form.templateName}
        </li>
      ))}
    </ul>
  );
};

export default FormsList;