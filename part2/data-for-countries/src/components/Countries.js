const Countries = ({ countries, showCountry }) => {
  const countriesToShow = countries.map(country => 
    <div key={country.name.common}>
      {country.name.common} <button value={country.name.common} onClick={showCountry}>show</button>
    </div>);

  return (
    <div>
      {countriesToShow}
    </div>
  );
};

export default Countries;