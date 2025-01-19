import { useDispatch } from "react-redux";
import FormsList from "./formList";
import { FormCardProps } from "../interfaces/FormInterfaces";
import { AppDispatch } from "../../store";
import FetchForms from "../../store/async Actions/forms";



const FormCard: React.FC<FormCardProps> = ({ forms, handleFormClick }) => {
	const dispatch: AppDispatch = useDispatch()
  return (
    <div className="card">
      <button
        style={{ visibility: forms.length > 0 ? 'hidden' : 'visible' }}
        onClick={() => dispatch(FetchForms())}
      >
        Получить формы из базы
      </button>
      {forms.length > 0 ? (
        <FormsList forms={forms} handleFormClick={handleFormClick} />
      ) : (
        <div>Формы отсутствуют!</div>
      )}
    </div>
  );
};

export default FormCard;