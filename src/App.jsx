import  { useState } from 'react';
import { fetchWeather } from "./api/fetchWeather"
import "./App.css"


function App() {

  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
        if(e.key === 'Enter') {
            const city = query.trim();

            if (!city) {
                return;
            }

            setError('');

            try {
                const data = await fetchWeather(city);
                setWeather(data);
                console.log(data)
                setQuery('');
            } catch (requestError) {
                if (requestError.response?.status === 404) {
                    setError(`No weather data found for "${city}".`);
                } else {
                    setError('Unable to fetch weather right now. Please try again.');
                }
            }
        }
    }

  return (
    <div className="main-container">
            <input type="text"
            className="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}/>
            {error && <p role="alert">{error}</p>}

            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
            
    </div>
  )
}

export default App
