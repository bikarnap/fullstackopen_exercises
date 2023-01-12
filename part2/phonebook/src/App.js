import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Bikarna Pokharel',
    }
  ]);
  const [newPerson, setNewPerson] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    
    const personExists = persons.find(person => person.name === newPerson);

    if (personExists) {
      alert(`${newPerson} has already been added to phonebook!`);
    } else {
      const personObject = {
        name: newPerson
      }
      setPersons(persons.concat(personObject));
    }
    setNewPerson('');
  };

  const handleNewPerson = (event) => setNewPerson(event.target.value);

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        name: <input type="text" onChange={handleNewPerson} value={newPerson} />
        <button type='submit'>add</button>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}</div>)}
      
    </div>
  );
}

export default App;
