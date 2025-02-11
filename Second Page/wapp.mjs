window.onload = function() {
  displayWeatherData();
};

function displayWeatherData() {
  let city = localStorage.getItem('city');
  let API_key = 'e0f99c494c2ce394a18cc2fd3f100543';
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`)
  .then(function(response){
    console.log(response);
    
    document.querySelector(".fc1").innerHTML = ` ${response.data.list[0].main.temp}°C`;
    document.querySelector(".fc4").innerHTML = ` ${response.data.list[1].main.temp}°C`;
    document.querySelector(".fc7").innerHTML = ` ${response.data.list[2].main.temp}°C`;
    document.querySelector(".fc3").textContent = ` ${response.data.list[0].dt_txt.split(" ")[1].slice(0, 5)}`;
    document.querySelector(".fc6").textContent = ` ${response.data.list[1].dt_txt.split(" ")[1].slice(0, 5)}`;
    document.querySelector(".fc9").textContent = ` ${response.data.list[2].dt_txt.split(" ")[1].slice(0, 5)}`;

    document.querySelector(".fc2").innerHTML = 
    `<img src="http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png" alt="Weather Icon">`;
    document.querySelector(".fc5").innerHTML = 
    `<img src="http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png" alt="Weather Icon">`;
    document.querySelector(".fc8").innerHTML = 
    `<img src="http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png" alt="Weather Icon">`;
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error.data);
    document.querySelector("#response").innerHTML = 'Error in getting weather data';
});
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`)
      .then(function(response) {
          console.log(response.data);
          document.querySelector("#img2nd").innerHTML = 
          `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="Weather Icon">`;
      
          document.querySelector("#response").innerHTML = 
              ` ${response.data.main.temp}°C`;
              document.querySelector("#description").innerHTML = 
              ` ${response.data.weather[0].description}`;
              document.querySelector("#max").innerHTML = 
              ` ${response.data.main.temp_max}°`;
              document.querySelector("#min").innerHTML = 
              ` ${response.data.main.temp_min}°`;
              let date = new Date();
              
             let day = date.getDate();
             console.log(day);
             let month = date.getMonth() + 1;
             switch(month){
              case 1: month = "January"; break;
              case 2: month = "February"; break;
              case 3: month = "March"; break;
              case 4: month = "April"; break;
              case 5: month = "May"; break;
              case 6: month = "June"; break;
              case 7: month = "July"; break;
              case 8: month = "August"; break;
              case 9: month = "September"; break;
              case 10: month = "October"; break;
              case 11: month = "November"; break;
              case 12: month = "December"; break;
              default: month = "Invalid month";
             }
             console.log(month);
             document.querySelector("#day").innerHTML = day.toString();
             document.querySelector("#month").innerHTML = `${month.toString()},`;

          
      })
      .catch(function(error) {
          console.log(error.data);
          document.querySelector("#result").innerHTML = 'Error in getting weather data';
      });
}
