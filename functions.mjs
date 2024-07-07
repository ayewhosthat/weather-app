import { MY_API_KEY } from "./api-key.mjs";
async function getWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${MY_API_KEY}&q=${city}`;
    const response = await fetch(url, {mode: "cors"});
    // since we have used await this returns a promise, we can then use .then on the promise to console.log
    // the weather data on a successful query
    response.json().then((response) => console.log(response));
}

export { getWeatherData };