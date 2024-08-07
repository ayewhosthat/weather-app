import { MY_API_KEY } from "./api-key.mjs";
async function getWeatherData(city) {
    // function to get hourly forecast + current weather for current day
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${MY_API_KEY}&q=${city}`;
    const response = await fetch(url, {mode: "cors"}).then((response) => {
        if (response.status === 400) {
            throw new Error('Invalid request. Please enter a valid city');
        } else {
            return response;
        }
    }).catch((error) => alert(error));
    const json = await response.json();
    return json;
}

async function getWeatherForecast(city) {
    // function to get 7 day forecast (exclusive of current day)
    const daily_url = `https://api.weatherapi.com/v1/forecast.json?key=${MY_API_KEY}&q=${city}&days=8`;
    const response = await fetch(daily_url, {mode: "cors"}).then((response) => {
        if (response.status === 400) {
            throw new Error('Invalid request. Please enter a valid city');
        } else {
            return response;
        }
    }).catch((error) => alert(error));
    const forecastdata = await response.json();
    return forecastdata;
}

function processTodayWeatherData(data) {
    // now we get the information we want to display for our app and process it
    const currentWeather = {};
    const hourlyForecasts = [];
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
    currentWeather['date'] = new Date(data['location']['localtime']).toUTCString().split(' ').slice(0, 3).join(' ')
    currentWeather['time'] = dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    currentWeather['icon'] = data['current']['condition']['icon'];

    for (const hourInfo of data['forecast']['forecastday'][0]['hour']) {
        const timeOfDay = hourInfo['time'];
        const dateObject = new Date(timeOfDay);
        hourlyForecasts.push({
            tempC: hourInfo['temp_c'],
            tempF: hourInfo['temp_f'],
            time: dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
            icon: hourInfo['condition']['icon']
        })
    }
    return {
        hourly: hourlyForecasts,
        current: currentWeather
    }
}

function process7DayWeather(data) {
    const weekWeather = [];
    for (let i = 1; i < data['forecast']['forecastday'].length; i++) {
        const day = data['forecast']['forecastday'][i];
        weekWeather.push({
            icon: day['day']['condition']['icon'],
            maxTempC: day['day']['maxtemp_c'],
            maxTempF: day['day']['maxtemp_f'],
            minTempC: day['day']['mintemp_c'],
            minTempF: day['day']['mintemp_f'],
            date: day['date'],
            dayOfWeek: new Date(day['date']).toUTCString().split(',')[0]
        })
    }
    return weekWeather;
}

export { getWeatherData, getWeatherForecast, processTodayWeatherData, process7DayWeather };