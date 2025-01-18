interface FormState<T> {
	forms: T[]
}

const defaultState: FormState<any> = {
	forms: []
}

const AddForms = "AddForms"

interface AddFormsAction<T> {
	type: typeof AddForms;
	payload: T[];
}

const formReducer = <T>(state: FormState<T> = defaultState, action: AddFormsAction<T> | any) => {
	switch (action.type) {
		case AddForms: 
			return {...state, forms: [...state.forms, ...action.payload]}
		default: 
			return state
	}
}

export const addFormsAction = <T>(payload: T[]): AddFormsAction<T> => ({type: AddForms, payload})

export default formReducer