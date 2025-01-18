import { TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, Checkbox, Button } from '@mui/material';
import { Field, FieldProps } from 'formik';
import { DateFieldComponentProps, FieldComponentProps } from '../interfaces/FieldInterfaces';

const TextFieldComponent: React.FC<FieldComponentProps> = ({ field, ...props }) => {
  return (
    <Field
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      as={TextField}
      label={field.label}
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

const DateFieldComponent: React.FC<DateFieldComponentProps> = ({ field, ...props }) => {
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
	)
}
const TimeFieldComponent = ({ field }) => {
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
	)
}

const NumberFieldComponent = ({ field }) => {
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
	)
}

const RadioFieldComponent = ({ field, ...props }) => {
  return (
    <Field
      name={field.name}
      as={RadioGroup}
      {...props}
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
};

const SelectFieldComponent = ({ field, ...props }) => {
  return (
    <Field
      name={field.name}
      as={Select}
      fullWidth
      margin="dense"
      displayEmpty
      {...props}
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
};

const CheckboxFieldComponent = ({ field, ...props }) => {
  return (
    <Field
      name={field.name}
      type="checkbox"
      as={Checkbox}
      {...props}
    />
  );
};

const TextareaFieldComponent = ({ field, ...props }) => {
  return (
    <Field
      name={field.name}
      as="textarea"
      placeholder={field.placeholder}
      style={{ width: '100%', height: '100px' }}
      {...props}
    />
  );
};

const MembersFieldComponent = ({ member, setMember, membersList, handleAddMember, handleRemoveMember }) => {
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
};

export {
  TextFieldComponent,
  RadioFieldComponent,
  SelectFieldComponent,
  CheckboxFieldComponent,
  TextareaFieldComponent,
  MembersFieldComponent,
	DateFieldComponent,
	TimeFieldComponent,
	NumberFieldComponent
};