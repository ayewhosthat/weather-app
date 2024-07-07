import { MY_API_KEY } from "./api-key.mjs";
async function getWeatherData(city) {
    // function to get hourly forecast for current day
    const url = `https://api.weatherapi.com/v1/current.json?key=${MY_API_KEY}&q=${city}`;
    const response = await fetch(url, {mode: "cors"});
    const currentdata = await response.json();
    return currentdata;    
}

async function getWeatherForecast(city) {
    // function to get 7 day forecast (exclusive of current day)
    const daily_url = `https://api.weatherapi.com/v1/forecast.json?key=${MY_API_KEY}&q=${city}&days=7`;
    const responseDaily = await fetch(daily_url, {mode: "cors"});
    const forecastdata = await responseDaily.json();
    return forecastdata;
}

function processWeatherData(response) {
    // now we get the information we want to display for our app and process it
    // maybe return a custom object????
    response.then()
}

export { getWeatherData, getWeatherForecast };