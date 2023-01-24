import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] =useState([]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    
    const personExists = persons.find(person => person.name === newPerson);

    if (personExists) {
      alert(`${newPerson} has already been added to phonebook!`);
    } else {
      const personObject = {
        name: newPerson,
        number: newNumber
      }
      axios.post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
        });
    }
    setNewPerson('');
    setNewNumber('');
  };

  const handleNewPerson = (event) => setNewPerson(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

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
      />
    </div>
  );
}

export default App;
