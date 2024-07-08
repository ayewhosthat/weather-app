import { MY_API_KEY } from "./api-key.mjs";
async function getWeatherData(city) {
    // function to get hourly forecast + current weather for current day
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${MY_API_KEY}&q=${city}`;
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

function processTodayWeatherData(response) {
    // now we get the information we want to display for our app and process it
    // maybe return a custom object????
    const currentWeather = {};
    const hourlyForecasts = [];
    response.then((data) => {
        const localTime = data['location']['localtime'];
        const dateObject = new Date(localTime); 
        currentWeather['currentTempC'] = data['current']['temp_c']
        currentWeather['currentTempF'] = data['current']['temp_f']
        currentWeather['feelsLikeC'] = data['current']['feelslike_c']
        currentWeather['feelsLikeF'] = data['current']['feelslike_f']
        currentWeather['humidity'] = data['current']['humidity'] + '%'
        currentWeather['condition'] = data['current']['condition']['text']
        currentWeather['uv'] = data['current']['uv']
        currentWeather['windSpeed'] = data['current']['wind_kph'] + ' km/h'
        currentWeather['windDirection'] = data['current']['wind_dir']
        currentWeather['cityName'] = data['location']['name']
        currentWeather['date'] = Date(data['location']['localtime']).toString().split(' ').slice(0, 3).join(' ')
        currentWeather['time'] = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        

        for (const hourInfo of data['forecast']['forecastday'][0]['hour']) {
            const timeOfDay = hourInfo['time'];
            const dateObject = new Date(timeOfDay);
            hourlyForecasts.push({
                condition: hourInfo['condition']['text'],
                tempC: hourInfo['temp_c'],
                tempF: hourInfo['temp_f'],
                time: dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            })
        }
    })
    return {
        hourly: hourlyForecasts,
        current: currentWeather
    }
}

export { getWeatherData, getWeatherForecast, processTodayWeatherData };