import { AppDispatch } from "../index";
import { addFormsAction } from "../formReducer"
import formData from './form.json'

interface FetchFormsThunk {
	(dispatch: AppDispatch): void;
}

const FetchForms: FetchFormsThunk = () => {
	return function (dispatch: AppDispatch) {
		dispatch(addFormsAction(formData));
		console.log(formData)
	}
}

export default FetchForms