import { getWeatherData, getWeatherForecast } from "./functions.mjs";
let currentCity = 'Mississauga';

const realtime = getWeatherData(currentCity);
realtime.then(response => console.log(response));
const forecast = getWeatherForecast(currentCity);
forecast.then(response => console.log(response));