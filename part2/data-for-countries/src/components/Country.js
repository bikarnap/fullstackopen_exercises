const Country = ({ country, weather }) => {
  return <div>
    <h1>{country.name.common}</h1>
          <div>capital {country.capital}</div>
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
                style={{ width: '150px' }}
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
};

export default Country;