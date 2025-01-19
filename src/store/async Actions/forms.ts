import { AppDispatch } from "../index";
import { addFormsAction } from "../formReducer"
import formData from './form.json'

const FetchForms = () => {
	return function (dispatch: AppDispatch) {
		dispatch(addFormsAction(formData));
		console.log(formData)
	}
}

export default FetchForms