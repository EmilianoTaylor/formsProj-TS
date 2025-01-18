import { useState } from "react";
import { CheckboxFieldComponent, DateFieldComponent, MembersFieldComponent, 
	NumberFieldComponent, RadioFieldComponent, SelectFieldComponent, 
	TextareaFieldComponent, TextFieldComponent, TimeFieldComponent } from "./fields";


const renderField = (field, membersList, setMembersList) => {
  const [member, setMember] = useState("");

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

	if (field.name === "members") {
		return (
			<MembersFieldComponent
				field={field}
				member={member}
				setMember={setMember}
				membersList={membersList}
				setMembersList={setMembersList}
				handleAddMember={handleAddMember}
				handleRemoveMember={handleRemoveMember}
			/>
		);
	}

	switch (field.type) {
		case 'text':
		case 'email':
		case 'password':
			return <TextFieldComponent field={field} />;
		case 'date':
			return <DateFieldComponent field={field} />;
		case 'time':
			return <TimeFieldComponent field={field} />;
		case 'number':
			return <NumberFieldComponent field={field} />;
		case 'radio':
			return <RadioFieldComponent field={field} />;
		case 'select':
		case 'multiselect':
			return <SelectFieldComponent field={field} />;
		case 'checkbox':
			return <CheckboxFieldComponent field={field} />;
		case 'textarea':
			return <TextareaFieldComponent field={field} />;
		default:
			return null;
	}
};

export default renderField;