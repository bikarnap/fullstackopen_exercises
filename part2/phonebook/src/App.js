import { useState } from 'react';

const App = () => {
  const [persons, setPersons] =useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

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
      setPersons(persons.concat(personObject));
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
      filter shown with <input type="text" onChange={handleFilterChange} value={filter} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" onChange={handleNewPerson} value={newPerson} />
        </div>
        <div>
          number: <input type="text" onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  );
}

export default App;
