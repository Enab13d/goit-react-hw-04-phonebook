import { useState } from 'react';
import { Field, ContactsForm, Label, SubmitBtn } from './ContactForm.styled';
import PropTypes from 'prop-types';
export const ContactForm = ({handleSubmit}) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

    return (
      <ContactsForm onSubmit={handleSubmit}>
        <Label htmlFor="name">Name</Label>
        <Field
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        />
        <Label htmlFor="number">Number</Label>
        <Field
          onChange={e => setNumber(e.target.value)}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
        <SubmitBtn>Add Contact</SubmitBtn>
      </ContactsForm>
    );

}

ContactForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
