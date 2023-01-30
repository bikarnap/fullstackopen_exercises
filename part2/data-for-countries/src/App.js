import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [city, setCity] = useState('london');
  const [weather, setWeather] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data);
        // console.log(response.data);
      });
  }, []);

  useEffect(() => {
    let weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    if (weatherApi !== `https://api.openweathermap.org/data/2.5/weather?q=undefined&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      axios
        .get(weatherApi)
        .then(response => {
          // console.log(response.data.name);
          setWeather(response.data);
        })
  }, [country]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShow(false);
    const country = countries.find(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
    setCountry(country);
    if (country.capital)
      setCity(country.capital[0]);
  };

  const handleShowCountry = (event) => {
    // console.log(event.target.value)
    setCountry(countries.find(country => country.name.common.toLowerCase() === event.target.value.toLowerCase()))
    // console.log(country)
    setCity(countries.find(country => country.name.common.toLowerCase() === event.target.value.toLowerCase()).capital[0])
    setShow(true);
  };

  // // console.log(country)

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase()));
  
  const filteredLength = filteredCountries.length;
  const countriesToRender = () => {
    if (filter) {
      if (filteredLength === 1) {
        return <div>
          <h1>{filteredCountries[0].name.common}</h1>
          <div>capital {filteredCountries[0].capital[0]}</div>
          <div>area {filteredCountries[0].area}</div>
          <div>
            <strong>languages</strong>
            <ul>
              {Object.keys(filteredCountries[0].languages)
                .map(lang => 
                <li key={lang}>
                  {filteredCountries[0].languages[lang]}
                </li>)
              }
            </ul>
            <div>
              <img 
                style={{ width: '150px', border: '1px solid #000000', padding: '4px 8px' }}
                src={filteredCountries[0].flags.png} 
                alt={`flag of ${filteredCountries[0].name.common}`} 
              />
            </div>
            <div>
              <h2>weather for {filteredCountries[0].capital}</h2>
              <div>temperature {weather.main.temp} celsius</div>
              <div>
                <strong>feels like {weather.main.feels_like} celsius</strong>
              </div>
              <div>{weather.weather[0].description}</div>
              <div>
                <img 
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                  alt={`weather icon for ${filteredCountries[0].name.common}`}
                />
              </div>
              <div>wind {weather.wind.speed} m/s</div>
            </div>
          </div>
        </div>
      }
  
      if (filteredLength <= 10) {
        if (show) {
          return <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
          <div>area {country.area}</div>
          <div>
            <strong>languages</strong>
            <ul>
              {Object.keys(country.languages)
                .map(lang => 
                <li key={lang}>
                  {country.languages[lang]}
                </li>)
              }
            </ul>
            <div>
              <img 
                style={{ width: '150px', border: '1px solid #000000', padding: '4px 8px'  }}
                src={country.flags.png} 
                alt={`flag of ${country.name.common}`} 
              />
            </div>
            <div>
              <h2>weather for {country.capital}</h2>
              <div>temperature {weather.main.temp} celsius</div>
              <div>
                <strong>feels like {weather.main.feels_like} celsius</strong>
              </div>
              <div>{weather.weather[0].description}</div>
              <div>
                <img 
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                  alt={`weather icon for ${country.name.common}`}
                />
              </div>
              <div>wind {weather.wind.speed} m/s</div>
            </div>
          </div>
          </div>
        }
        return <div>
          <Countries
            countries={filteredCountries}
            showCountry={handleShowCountry}
          />
        </div>
      } else {
        return <div>Too many search results</div>
      }
    }
  };
  
  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      {countriesToRender()}
    </div>
  );
}

export default App;
