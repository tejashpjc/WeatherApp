import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "fe1a75e932bc9abc841bf2b58a8d0a63";
  const fetchWeather = async () => {
    try {
      setError(null);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 p-6">
      <h1 className="text-3xl font-bold mb-4">Weather App</h1>
      <div className="flex space-x-2 mb-4">
        <Input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-2 border rounded-lg"
        />
        <Button onClick={fetchWeather} className="bg-blue-500 text-white p-2 rounded-lg">Get Weather</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <Card className="w-80 p-4 bg-white shadow-lg rounded-lg">
          <CardContent>
            <h2 className="text-xl font-semibold">{weather.name}, {weather.sys.country}</h2>
            <p className="text-lg">Temperature: {weather.main.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind Speed: {weather.wind.speed} m/s</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherApp;

//created by Tejash Patel
