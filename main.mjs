import { getWeatherData, getWeatherForecast, processTodayWeatherData, process7DayWeather } from "./functions.mjs";
let currentCity = 'Mississauga';
let currentPage = 0; // represents the current 'slide' of the hourly section that we're on

// add event listeners and functions to update the carousel to change what hours we can see 
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const page3 = document.getElementById('page-3');
const page4 = document.getElementById('page-4');

// initial page is page1, set the display of others to none
page1.style.display = 'grid';
page2.style.display = 'none';
page3.style.display = 'none';
page4.style.display = 'none';

// we let the default display temperature to be celsius, so we set the farenheit boxes to be 'invisible'
// when the user toggles the switch, we switch the visibility of farenheit/celsius boxes
const celsius = document.querySelectorAll('.c');
const farenheit = document.querySelectorAll('.f');

function hideUnit(unit) {
    if (unit === 'C') {
        for (const elemC of celsius) {
            elemC.style.display = 'none';
        }
        for (const elemF of farenheit) {
            elemF.style.display = 'block';
        }
    } else {
        for (const elemF of farenheit) {
            elemF.style.display = 'none';
        }
        for (const elemC of celsius) {
            elemC.style.display = 'block';
        }
    }
}

hideUnit('F'); // hide farenheit units

// add event listener to checkbox that fires every time the checkbox is clicked
const toggleSwitch = document.getElementById('toggle-switch')
toggleSwitch.addEventListener('click', () => {
    if (toggleSwitch.checked) {
        hideUnit('C');
    } else {
        hideUnit('F');
    }
})

const moveRight = document.getElementById('move-right');
moveRight.addEventListener('click', () => {
    currentPage = (currentPage + 1) % 4;
    updateHourlyDisplay(currentPage);
});

const moveLeft = document.getElementById('move-left');
moveLeft.addEventListener('click', () => {
    if (currentPage === 0) {
        currentPage = 3;
    } else if (currentPage === 1) {
        currentPage = 0;
    } else if (currentPage === 2) {
        currentPage = 1;
    } else {
        currentPage = 2;
    }
    updateHourlyDisplay(currentPage);
;})

function updateHourlyDisplay(currentPage) {
    if (currentPage === 0) {
        page1.style.display = 'grid';
        page2.style.display = 'none';
        page3.style.display = 'none';
        page4.style.display = 'none';
    } else if (currentPage === 1) {
        page1.style.display = 'none';
        page2.style.display = 'grid';
        page3.style.display = 'none';
        page4.style.display = 'none';
    } else if (currentPage === 2) {
        page1.style.display = 'none';
        page2.style.display = 'none';
        page3.style.display = 'grid';
        page4.style.display = 'none';
    } else { 
        page1.style.display = 'none';
        page2.style.display = 'none';
        page3.style.display = 'none';
        page4.style.display = 'grid';
    }
}

// add event listeners to 'dots'
const listOfDots = document.querySelectorAll('span');
for (let i = 0; i < listOfDots.length; i++) {
    const dot = listOfDots[i];
    const pageNumber = Number.parseInt(dot.getAttribute('id'));
    dot.addEventListener('click', () => {
        currentPage = pageNumber - 1;
        updateHourlyDisplay(currentPage);
    })
}

async function updatePage(city) {
    const todaysData = await getWeatherData(city);
    const todayProcessed = processTodayWeatherData(todaysData);
    const weeklyData = await getWeatherForecast(city);
    const weeklyProcesssed = process7DayWeather(weeklyData);

    // now time to update the DOM elements
    // CURRENT WEATHER
    document.getElementById('current-condition-text').textContent = `Current conditions: ${todayProcessed['current']['condition']}`; // current condition
    document.getElementById('current-uv').textContent = `UV Index:${todayProcessed['current']['uv']}`; // current uv
    document.getElementById('current-humidity').textContent = `Humidity: ${todayProcessed['current']['humidity']}`; // current humidity
    document.getElementById('current-wind').textContent = `Wind: ${todayProcessed['current']['windSpeed']} ${todayProcessed['current']['windDirection']}`;
    document.getElementById('current-temperature-c').textContent = `${todayProcessed['current']['currentTempC']}°C`;
    document.getElementById('current-temperature-f').textContent = `${todayProcessed['current']['currentTempF']}°F`;
    document.getElementById('feelslike-current-c').textContent = `Feels like ${todayProcessed['current']['feelsLikeC']}°C`;
    document.getElementById('feelslike-current-f').textContent = `Feels like ${todayProcessed['current']['feelsLikeF']}°F`;
    document.getElementById('location').textContent = `${todayProcessed['current']['cityName']}`;
    document.getElementById('current-time').textContent = `${todayProcessed['current']['date']}, ${todayProcessed['current']['time']}`;
}
updatePage(currentCity);