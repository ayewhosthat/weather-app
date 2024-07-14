### Summary 
Hesitant to start the project at first, once I figured out how to update the page properly using the fetched data, the rest was relatively smooth sailing, in part due to the fact that it used many components from previous lessons. For example, I decided to use a carousel system to display the hourly data for the current region. All in all, a very fun project that combined several portions of TOP together :D.

### Difficulties/Takeaways
The big difficulty/takeaway was applying the concepts learned the lessons about asynchronous code and async/await. From this I also learned to adopt a different way of thinking from when I write synchronous code. To illustrate, my initial plan was to fetch the weather data and store the current, hourly, and weekly information in their respective variables. However, this quickly turned out to be a flawed approach, since I failed to remember that async functions *only return promises*:

```js
async function getWeatherData(city) {
  const data = await fetch(url);
  const response = await data.json();
  return response;
}
```
The above code returns a promise, and the data cannot be accessed until the promise is fulfilled. Along with some asking around, I was able to figure out that there is no way to access the data stored inside a promise inside a synchronous function. Thus, I did away with the 'variable' approach, and turned to calling getWeatherData() inside an asynchronous wrapper function:

```js
aync function doStuff() {
  const today = await getWeather(data)
  // process data and then update page
}
```

### Next steps for improvement
- Improve aesthetic layout (styling is inconsistent in certain areas)
- Perhaps add animations when 'scrolling' through hourly data
- Have hourly data show starting from the next hour instead of 12:00 AM that same day (e.g. if the local time is 4:30 PM, then the hourly section would start with the weather for 5:00 PM

### Image Credits
- All weather icons courtesy of WeatherAPI.com (retrieved from json response objects)
- Search icon by Google Material Symbols & Icons: https://fonts.google.com/icons?selected=Material+Symbols+Outlined:search:FILL@0;wght@400;GRAD@0;opsz@24&icon.size=24&icon.color=%23e8eaed

### Link to live preview
https://ayewhosthat.github.io/weather-app/
