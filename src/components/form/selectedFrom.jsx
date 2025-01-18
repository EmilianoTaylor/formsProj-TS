import { Button } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const SelectedForm = ({ selectedForm, handleSubmit, renderField }) => {
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

  return (
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
  );
};

export default SelectedForm;
