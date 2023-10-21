import './Weather.css'
import React, { useState, useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'

function Weather () {
  const [weatherData, setWeatherData] = useState(null)
  const [cityInput, setCityInput] = useState('')

  const apiKey = 'a2036552862e6799e4773943b130cffe'

  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}`

    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setWeatherData(data)
      } else {
        console.error('Failed to fetch weather data')
        setWeatherData(null)
      }
    } catch (error) {
      console.error('Error while fetching weather data:', error)
      setWeatherData(null)
    }
  }

  const handleSearch = () => {
    fetchWeatherData()
    setCityInput('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData()
      setCityInput('')
    }
  }

  useEffect(() => {
    fetchWeatherData()
  }, [])

  return (
    <Container className="weather-container">
      <Row className="justify-content-center align-items-center h-100">
        <Col>
          <div className="weather-element">
            <div className="weather-element-input">
              <input
                type="text"
                placeholder="Enter City Name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className="btn" onClick={handleSearch}>
                Search
              </button>
            </div>
            {weatherData && (
              <div className="weather-element-info">
                <div className="weather-element-info-location">
                  <h2>{weatherData.name}</h2>
                </div>
                <div className="weather-element-info_weather">
                  <div className="weather-element-info-image">
                    <img
                      src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
                      alt="weather"
                    />
                  </div>
                  <div className="weather-element-info-description">
                    <div className="weather-element-info-description_temperature">
                      <p>Temperature: {weatherData.main.temp}°C</p>
                    </div>
                    <div className="weather-element-info-description_wind">
                      <p>Wind: {weatherData.wind.speed} km/h</p>
                    </div>
                    <div className="weather-element-info-description_humidity">
                      <p>Humidity: {weatherData.main.humidity}%</p>
                    </div>
                    <div className="weather-element-info-description_pressure">
                      <p>Pressure: {weatherData.main.pressure} hPa</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Weather
