import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { Wrapper } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => getContactsFromLocalStorage() ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const itemToSet = JSON.stringify(contacts);
      localStorage.setItem('contacts', itemToSet);
    } catch (e) {
      console.log(e);
    }
  }, [contacts]);

  function getContactsFromLocalStorage() {
    try {
      const recievedContacts = JSON.parse(localStorage.getItem('contacts'));
      if (recievedContacts) {
        return recievedContacts;
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { name, number } = e.target.elements;
    const value = name.value;
    let id = nanoid();
    const isContain = contacts.some(
      contact => contact.name.toLowerCase() === value.toLowerCase()
    );
    if (isContain) {
      return alert(`${value} is already in contacts.`);
    }
    console.log(number.value);
    const tel = number.value;
    setContacts(prevContacts => [
      ...prevContacts,
      { name: value, number: tel, id },
    ]);
    console.log(contacts);
    e.target.reset();
  };
  const getFoundContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const handleFilterChange = e => setFilter(e.target.value);
  const handleDeleteBtnClick = e =>
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== e.target.id)
    );

  const filteredContacts = getFoundContacts();

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit}></ContactForm>
      <h2>Contacts</h2>
      <Filter handleFilterChange={handleFilterChange} filter={filter}></Filter>
      <ContactList
        contacts={filteredContacts}
        handleDeleteBtnClick={handleDeleteBtnClick}
      ></ContactList>
    </Wrapper>
  );
};
