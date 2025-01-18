import { TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Checkbox, Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import FetchForms from './store/async Actions/forms'
import { useState } from 'react'
import axios from 'axios'
import './App.css'



function App() {
	const dispatch = useDispatch()
	const forms = useSelector(state => state.forms.forms)
	const [selectedForm, setSelectedForm] = useState(null);
	const [member, setMember] = useState(""); 
  const [membersList, setMembersList] = useState([]);

  const handleFormClick = (form) => {
    setSelectedForm(form);
    setMembersList([]);
  };

	const handleSubmit = async (values, { resetForm } ) => {
		try {
			const data = { ...values, members: membersList.length > 0 ? membersList : null };
			const response = await axios.post('http://localhost:5001/submit-form', data);
			console.log('Данные успешно отправлены:', response.data);
			resetForm();
			setMembersList([]);
			setMember("");
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
	}

  const handleAddMember = () => {
    if (member.trim() !== "") {
      setMembersList([...membersList, member]);
      setMember("");
    }
  };

  const handleRemoveMember = (index) => {
    const newMembersList = [...membersList];
    newMembersList.splice(index, 1);
    setMembersList(newMembersList);
  };
	
	const validate = (values) => {
		const errors = {};
		selectedForm.fields.forEach((field) => {
			if (field.validation && field.validation.required && !values[field.name]) {
				errors[field.name] = 'Required';
			}
			if (field.validation && field.validation.pattern && values[field.name] && typeof values[field.name] === 'string' && !new RegExp(field.validation.pattern).test(values[field.name])) {
				errors[field.name] = 'Invalid format';
			}
			if (field.validation && field.validation.minLength && values[field.name] && typeof values[field.name] === 'string' && values[field.name].length < field.validation.minLength) {
				errors[field.name] = `Minimum length is ${field.validation.minLength}`;
			}
			if (field.validation && field.validation.min && values[field.name] && typeof values[field.name] === 'number' && values[field.name] < field.validation.min) {
				errors[field.name] = `Minimum value is ${field.validation.min}`;
			}
			if (field.validation && field.validation.max && values[field.name] && typeof values[field.name] === 'number' && values[field.name] > field.validation.max) {
				errors[field.name] = `Maximum value is ${field.validation.max}`;
			}
		});
		return errors;
	};

	const renderField = (field) => {
		if (field.name === "members") {
      return (
        <div>
          <Field
            type="text"
            name="members"
            as={TextField}
            label="Member"
            fullWidth
            margin="normal"
            value={member}
            onChange={(e) => setMember(e.target.value)}
          />
          <Button onClick={handleAddMember}>Добавить</Button>
          <ul>
            {membersList.map((member, index) => (
              <li key={index} className='member'>
                {member}
                <Button onClick={() => handleRemoveMember(index)}>Удалить</Button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

		switch (field.type) {
			case 'text':
			case 'email':
			case 'password':
				return (
					<Field
						type={field.type}
						name={field.name}
						placeholder={field.placeholder}
						as={TextField}
						label={field.label}
						fullWidth
						margin="normal"
					/>
				);
			case 'date':
				return (
					<Field
						type="date"
						name={field.name}
						as={TextField}
						label={field.label}
						fullWidth
						margin="normal"
						InputLabelProps={{ shrink: true }}
					/>
				);
			case 'time':
				return (
					<Field
						type="time"
						name={field.name}
						as={TextField}
						label={field.label}
						fullWidth
						margin="normal"
						InputLabelProps={{ shrink: true }}
					/>
				);
			case 'number':
				return (
					<Field
						type="number"
						name={field.name}
						placeholder={field.placeholder}
						as={TextField}
						label={field.label}
						fullWidth
						margin="normal"
					/>
				);
			case 'radio':
				return (
					<Field
						name={field.name}
						as={RadioGroup}
					>
						{field.options.map((option) => (
							<FormControlLabel key={option}
								control={<Radio />}
								label={option}
								value={option}
							/>
						))}
					</Field>
				);
			case 'select':
			case 'multiselect':
				return (
					<Field
						name={field.name}
						as={Select}
						fullWidth
						margin="dense"
						displayEmpty
					>
						<MenuItem value="" disabled>
							{field.label}
						</MenuItem>
						{field.options.map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</Field>
				);
			case 'checkbox':
				return (
					<Field
						name={field.name}
						type="checkbox"
						as={Checkbox}
					/>
				);
			case 'textarea':
				return (
					<Field
						name={field.name}
						as="textarea"
						placeholder={field.placeholder}
						style={{ width: '100%', height: '100px' }}
					/>
				);
			default:
				return null;
		}
	};


  return (
		<>
      <div className="card">
				<button style={{visibility: forms.length > 0 ? 'hidden' : 'visible'}} 
				onClick={() => dispatch(FetchForms())}
				>
					Получить формы из базы
				</button>
				{forms.length > 0 ? 
				<ul>
					{forms.map((form) => 
						<li 
						className='formType'
						key={form.id}
						onClick={() => handleFormClick(form)}
						>
							{form.templateName}
						</li>
					)}
				</ul>
				:
				<div>
					Формы отсутствуют!
				</div>}
      </div>
			{selectedForm && (
				<div>
					<p>Тип формы: {selectedForm.templateName}</p>
					<Formik
						key={selectedForm.id}
            initialValues={selectedForm.fields.reduce((acc, field) => {
              acc[field.name] = '';
              return acc;
            }, {})}
            validate={validate}
            onSubmit={handleSubmit}
          >
					{({ resetForm }) => (
							<Form>
								{selectedForm.fields.map((field) => (
									<div key={field.name}>
										{renderField(field)}
										<ErrorMessage name={field.name} component="div" style={{ color: 'red' }} />
									</div>
								))}
								<Button type="submit">Submit</Button>
							</Form>
						)}
          </Formik>
				</div>
			)}
		</>
  )
}

export default App