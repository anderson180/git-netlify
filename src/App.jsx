import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

function App() {
  
const [coords, setCoords ] = useState();
const  [weather, setWeather] = useState();
const [temp, setTemp] = useState();
const [isLoading, setIsLoading]  = useState(true);

const success = (pos) => {
  const obj = { 
    lat: pos.coords.latitude,
    lon: pos.coords.longitude,
}
setCoords(obj);
}

useEffect(() => {
  navigator.geolocation.getCurrentPosition(success);
}, []);

useEffect(() => {
  if (coords) {
  const apikey = '6e4934859387d4c8724c9a95da4cf259';
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apikey}`;

  axios.get(url)
  .then(res => {
    const cel = (res.data.main.temp - 273.15).toFixed(3);
    const fah = (cel *9/5 + 32).toFixed(2);
    setTemp({cel, fah});
    setWeather(res.data);
  })
  .catch(err => console.log(err))
  .finally(()=>{
    setIsLoading(false);
  });
}
}, [coords]);

console.log(temp);

  return (
 <div className='app'> 
 {
 isLoading ?
  <h2>Loading...</h2>
:
  <WeatherCard
  weather={weather}
  temp={temp}
  />
 }
 </div>
  )
}

export default App
