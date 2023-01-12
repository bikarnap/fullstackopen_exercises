import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Bikarna Pokharel',
      number: '0443350986'
    }
  ]);
  const [newPerson, setNewPerson] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <div>
      <h1>Phonebook</h1>
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
      {persons.map(person => 
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  );
}

export default App;
