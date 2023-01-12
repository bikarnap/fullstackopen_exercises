const PersonForm = ({ addPerson, handleNewPerson, newPerson, handleNumberChange, newNumber }) => 
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
  </form>;

export default PersonForm;