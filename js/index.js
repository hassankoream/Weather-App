// recode after week14



// global variables

var userSearch = document.getElementById("userSearch");
var searchButton = document.getElementById("searchButton");
var dayOne= document.querySelector('.dayOne');
var dateOne= document.querySelector('.dateOne');
var cityName= document.querySelector('.cityName');
var todayTemp= document.querySelector('.todayTemp');
var statusIcon= document.querySelector('.statusIcon');
var statusName= document.querySelector('.statusName');
var humidity= document.querySelector('.humidity');
var windSpeed= document.querySelector('.windSpeed');
var windDir= document.querySelector('.windDir');
var dayTwoName= document.querySelector('.dayTwoName');
var dayTwoIcon= document.querySelector('.dayTwoIcon');
var dayTwoMaxTemp= document.querySelector('.dayTwoMaxTemp');
var dayTwoMinTemp= document.querySelector('.dayTwoMinTemp');
var dayTwoStatus= document.querySelector('.dayTwoStatus');
var dayThreeName= document.querySelector('.dayThreeName');
var dayThreeIcon= document.querySelector('.dayThreeIcon');
var dayThreeMaxTemp= document.querySelector('.dayThreeMaxTemp');
var dayThreeMinTemp= document.querySelector('.dayThreeMinTemp');
var dayThreeStatus= document.querySelector('.dayThreeStatus');


async function getForecast(city){
    var result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=fbaad8f9ae0f4feba1f82902241306&q=${city}&days=3`);
    var finalResult = await result.json();

    var formattedDate = convertDateFormat(finalResult.forecast.forecastday[0].date);
    dateOne.innerHTML = formattedDate;
    var day1Week = getDayOfWeek(finalResult.forecast.forecastday[0].date);
    var day2Week = getDayOfWeek(finalResult.forecast.forecastday[1].date);
    var day3Week = getDayOfWeek(finalResult.forecast.forecastday[2].date);
    dayOne.innerHTML = day1Week;
    dayTwoName.innerHTML = day2Week;
    dayThreeName.innerHTML = day3Week;
    return finalResult;
}

// var x = getForecast();
// console.log(x);
searchButton.addEventListener('click', async function(){
    // var searchTerm = userSearch.value;
    displayData(userSearch.value);
    userSearch.value = '';
})
var regex = /^[a-z]{3,10}$/i;
userSearch.addEventListener('input', async function(){
    
    console.log(regex.test(userSearch.value));
    if (regex.test(userSearch.value) == true){
       // var searchTerm = userSearch.value;
       displayData(userSearch.value);
      
    }
})

var forecastWeather
async function displayData(displayTerm){
   try{
    forecastWeather = await getForecast(displayTerm);
    cityName.innerHTML = forecastWeather.location.name;
    todayTemp.innerHTML = forecastWeather.current.temp_c+"&deg;C";
    var iconUrl = "https:" + forecastWeather.current.condition.icon;
    statusIcon.setAttribute('src', iconUrl);
    
    statusName.innerHTML = forecastWeather.current.condition.text;
    humidity.innerHTML =forecastWeather.current.humidity+'%';
    windSpeed.innerHTML =forecastWeather.current.wind_kph+" km/h";
    windDir.innerHTML =forecastWeather.current.wind_dir;
// dayTwo
    var dayTwoIconUrl = "https:" + forecastWeather.forecast.forecastday[1].day.condition.icon;
    dayTwoIcon.setAttribute('src', dayTwoIconUrl);
    dayTwoMaxTemp.innerHTML = forecastWeather.forecast.forecastday[1].day.maxtemp_c+"&deg;C";
    dayTwoMinTemp.innerHTML = forecastWeather.forecast.forecastday[1].day.mintemp_c+"&deg;C";
    dayTwoStatus.innerHTML = forecastWeather.forecast.forecastday[1].day.condition.text;
// dayThree
    var dayThreeIconUrl = "https:" + forecastWeather.forecast.forecastday[2].day.condition.icon;
    dayThreeIcon.setAttribute('src', dayThreeIconUrl);
    dayThreeMaxTemp.innerHTML = forecastWeather.forecast.forecastday[2].day.maxtemp_c+"&deg;C";
    dayThreeMinTemp.innerHTML = forecastWeather.forecast.forecastday[2].day.mintemp_c+"&deg;C";
    dayThreeStatus.innerHTML = forecastWeather.forecast.forecastday[2].day.condition.text;
   }
   catch {
    alert('Please enter a valid city name');
 
}
   
}


// get user ip, and get city
// https://api.geoapify.com/v1/ipinfo?apiKey=890c890d20724bf38a08e9330aae2622



async function getGeolocation(){
    var result = await fetch(`https://api.geoapify.com/v1/ipinfo?apiKey=890c890d20724bf38a08e9330aae2622`);
    var finalResult = await result.json();
    var userCityName = finalResult.city.name;
    return userCityName;
}
window.addEventListener('load', async function() {
    var x = await getGeolocation()
    displayData(x);
});


function getDayOfWeek(dateString) {
    // Parse the date string using the Date constructor
    const date = new Date(dateString);

    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeekNumber = date.getDay();

    // Map day number to day name
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[dayOfWeekNumber];
}





function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day}${month}`;
}