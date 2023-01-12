const Filter = ({ filter, handleFilterChange }) => 
<div>filter shown with <input type="text" onChange={handleFilterChange} value={filter} /></div>;

export default Filter