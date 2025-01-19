import { Button } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import { SelectedFormProps } from '../interfaces/FormInterfaces';

const SelectedForm: React.FC<SelectedFormProps> = ({ selectedForm, handleSubmit, renderField }) => {
  const validate = (values: {[key: string]: any}): {[key: string]: string}  => {
    const errors: { [key: string]: string } = {};
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
        initialValues={selectedForm.fields.reduce((acc: Record<string, string>, field) => {
          acc[field.name] = '';
          return acc;
        }, {})}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ resetForm }: { resetForm: any }) => (
          <Form>
            {selectedForm.fields.map((field) => (
              <div key={field.name}>
                {renderField(field)}
                <ErrorMessage name={field.name} className='redDiv' component="div"/>
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
