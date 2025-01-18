import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'
import { useState } from 'react'
import './App.css'
import SelectedForm from './components/form/selectedFrom';
import FormCard from './components/form/formCard';
import axios from 'axios';
import renderField from './components/fields/renderField';



function App() {
	const forms = useSelector(state => state.forms.forms)
	const [selectedForm, setSelectedForm] = useState(null);
	const [membersList, setMembersList] = useState([]);

  const handleFormClick = (form) => {
    setSelectedForm(form);
    setMembersList([]);
  };

	const handleSubmit = async (values, { resetForm } ) => {
		try {
			const data = { ...values, members: membersList.length > 0 ? membersList : null };
			const response = await axios.post('http://localhost:5001/submit-form', data);
			toast.success('Данные успешно отправлены!');
			resetForm();
			setMembersList([]);
    } catch (error) {
      toast.error('Ошибка при отправке данных!');
    }
	}

  return (
    <>
			<ToastContainer />
      <FormCard forms={forms} handleFormClick={handleFormClick} />
      {selectedForm && (
        <SelectedForm
          selectedForm={selectedForm}
          handleSubmit={handleSubmit}
          renderField={(field) => renderField(field, membersList, setMembersList)}
        />
      )}
    </>
  )
}

export default App
