import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './App.css';
import SelectedForm from './components/form/selectedFrom';
import FormCard from './components/form/formCard';
import axios from 'axios';
import renderField from './components/fields/renderField';
import { useTypedSelector } from './components/hooks/useTypedSelector';
import { SelectedStateProps } from './components/interfaces/RootInterfaces';

function App() {
  const forms = useTypedSelector(state => state.forms.forms);
  const [selectedForm, setSelectedForm] = useState<SelectedStateProps | null>(null);
  const [membersList, setMembersList] = useState<any[]>([]);

  const handleFormClick = (form: SelectedStateProps) => {
    setSelectedForm(form);
    setMembersList([]);
  };

  const handleSubmit = async (values: {[key: string]: any}, { resetForm }: { resetForm: () => void }) => {
    try {
      const data = { ...values, members: membersList.length > 0 ? membersList : null };
      await axios.post('http://localhost:5001/submit-form', data);
      toast.success('Данные успешно отправлены!');
      resetForm();
      setMembersList([]);
    } catch (error) {
      toast.error('Ошибка при отправке данных!');
    }
  };

  return (
    <>
      <ToastContainer />
      <FormCard forms={forms} handleFormClick={handleFormClick} />
      {selectedForm && (
        <SelectedForm
          selectedForm={selectedForm}
          handleSubmit={handleSubmit}
          renderField={(field) => renderField({ field, membersList, setMembersList })}
        />
      )}
    </>
  );
}

export default App;
