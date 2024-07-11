import { getWeatherData, getWeatherForecast, processTodayWeatherData, process7DayWeather } from "./functions.mjs";
let currentCity = 'Mississauga';
let currentPage = 1; // represents the current 'slide' of the hourly section that we're on

// add event listeners and functions to update the carousel to change what hours we can see 
const page1 = document.getElementById('page-1');
const page2 = document.getElementById('page-2');
const page3 = document.getElementById('page-3');
const page4 = document.getElementById('page-4');

// initial page is page1, set the display of others to none
console.log(page1);
page1.style.display = 'grid';
page2.style.display = 'none';
page3.style.display = 'none';
page4.style.display = 'none';

