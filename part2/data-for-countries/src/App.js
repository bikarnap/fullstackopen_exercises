import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, []);

  const handleCountryFilter = (event) => setCountryFilter(event.target.value)

  const countriesToShow = () => {
    const filteredCountries = countries.filter(country => {
      if (country.name.common.toLowerCase().trim() === countryFilter.toLocaleLowerCase().trim()) {
        return country
      } else {
        return country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
      }
    });
    const filteredCountriesLength = filteredCountries.length;
    if (countryFilter) {
      if (filteredCountriesLength === 1) {
        return (
          <>
            {filteredCountries.map(country => 
              <div key={country.name.common}>
                <h1>{country.name.common}</h1>
                <div>capital {country.capital}</div>
                <div>area {country.area}</div>
                <div>
                  <p><strong>languages</strong></p>
                  <ul>
                    {Object.keys(filteredCountries[0].languages).map(lk => <li key={lk}>{filteredCountries[0].languages[lk]}</li>)}
                  </ul>
                </div>
                <img style={{ width: '150px' }} src={country.flags.png} alt={`flag of ${country.name.common}`} />
              </div>
            )}
          </>
        )
      } 
      if (filteredCountriesLength <= 10) {
        return (
          <>
            {filteredCountries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
          </>
        )
      } 
      return (
        <div>Too many matches, specity another filter</div>
      )
    }
  }
  return (
    <div>
      find countries <input type="text" onChange={handleCountryFilter} value={countryFilter} />
      {countriesToShow()}
    </div>
  );
}

export default App;
