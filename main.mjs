import { getWeatherData, getWeatherForecast, processTodayWeatherData, process7DayWeather } from "./functions.mjs";

let currentCity = 'Mississauga';
let todaysData = getWeatherData(currentCity);
let todaysProcessedData = processTodayWeatherData(todaysData);

function displayCurrentWeather() {
    console.log(todaysProcessedData['current']['condition'])
}

displayCurrentWeather();