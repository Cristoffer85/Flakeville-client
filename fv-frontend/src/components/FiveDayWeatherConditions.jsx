import React, { useState } from 'react';
import './css/FiveDayWeatherConditions.css';

function FiveDayWeatherConditions({ data }) {
    if (!data) {
        return null;
    }

    const [expandedForecastIndex, setExpandedForecastIndex] = useState(null);

    return (
        <div className="five-day-conditions">
            <h2>5-Day Conditions</h2>
            {data.list.map((forecast, index) => {
                const isExpanded = index === expandedForecastIndex;

                return (
                    <div key={index} className={`forecast ${isExpanded ? 'active' : ''}`}>
                        <h3 onClick={() => setExpandedForecastIndex(isExpanded ? null : index)}>{forecast.dt_txt}</h3>
                        {isExpanded && (
                            <div className="forecast-details active">
                                <h4>Weather</h4>
                                <p>Main: {forecast.weather[0].main}</p>
                                <p>Summary: {forecast.weather[0].description}</p>
                                <p>Temperature: {forecast.main.temp}</p>
                                <p>Feels Like: {forecast.main.feels_like}</p>
                                <p>Min Temp: {forecast.main.temp_min}</p>
                                <p>Max Temp: {forecast.main.temp_max}</p>
                                <p>Humidity: {forecast.main.humidity}</p>
                                <h4>Wind</h4>
                                <p>Speed: {forecast.wind.speed}</p>
                                <p>Direction: {forecast.wind.deg}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default FiveDayWeatherConditions;