import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] =useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    
    const personExists = persons.find(person => person.name === newPerson);
    const numberExists = persons.find(person => person.number === newNumber);

    if (personExists) {
      if (personExists.number !== newNumber) {
        if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one? `)) {
          const personObject = {...personExists, number: newNumber};
          personsService
            .update(personExists.id, personObject)
            .then(updatedPerson => {
              setPersons(persons.filter(person => person.name !== personExists.name).concat(updatedPerson))
            });
        }
      } else {
        alert(`${newPerson} has already been added to phonebook!`);
      }
    } else {
      const personObject = {
        name: newPerson,
        number: newNumber
      }
      personsService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
        });
    }
    setNewPerson('');
    setNewNumber('');
  };

  const handleNewPerson = (event) => setNewPerson(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);
  const removePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${personToRemove.name}?`)) {
      personsService
      .deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
  }

  const personsToShow = !filter
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newPerson={newPerson}
        newNumber={newNumber}
        handleNewPerson={handleNewPerson}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        deletePerson={removePerson}
      />
    </div>
  );
}

export default App;
