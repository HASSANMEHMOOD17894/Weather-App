window.onload = function () {
    displayWeatherData();
};

let index = 0;
const cards = document.querySelectorAll('.slider .card');
const totalCards = cards.length;

let scrollIndex = 0;


function showSlide() {
    const offset = -index * (50); // 100 for the card width, 20 for the margin between cards
    document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

document.querySelector('.right-arrow').addEventListener("click", () => {
    index = (index + 1) % totalCards;  // Go to next card
    showSlide();
    rightScroll();
});

document.querySelector('.left-arrow').addEventListener("click", () => {
    index = (index - 1 + totalCards) % totalCards;  // Go to previous card
    showSlide();
    leftScroll();
});

document.querySelectorAll(".see, .arrow").forEach(element => {
    let see = document.querySelector(".see");
    let arrow = document.querySelector(".arrow");

    element.addEventListener("mouseenter", () => {
        see.style.opacity = "0.6";
        see.style.transition = "0.6s"

        arrow.style.opacity = "0.6";
        arrow.style.transition = "0.6s";
    });

    element.addEventListener("mouseleave", () => {
        see.style.opacity = "1";
        arrow.style.opacity = "1";
    })
});

function addHover() {
    

}

function rightScroll() {
    if (scrollIndex === 0) {
        document.querySelector(".forecast1").style.display = "none";
        document.querySelector(".forecast4").style.display = "block";
    }

    else if (scrollIndex === 1) {
        document.querySelector(".forecast2").style.display = "none";
        document.querySelector(".forecast5").style.display = "block";
    }

    else return;

    scrollIndex++;
}

function leftScroll() {
    if (scrollIndex === 1) {
        document.querySelector(".forecast1").style.display = "block";
        document.querySelector(".forecast4").style.display = "none";
    }

    else if(scrollIndex === 2) {
        document.querySelector(".forecast2").style.display = "block";        
        document.querySelector(".forecast5").style.display = "none";
    }

    else return;

    scrollIndex--;        

}

function displayWeatherData() {
    let city = localStorage.getItem('city');
    let API_key = 'e0f99c494c2ce394a18cc2fd3f100543';

    //---------------------------------------------------------------->>
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`)
        .then(function (response) {
            console.log(response);

            getAQIData(response.data.city.coord.lat, response.data.city.coord.lon, API_key);
            getUVIndex(response);
            getSunriseTime(response);
            getSunsetTime(response);
            
            getConvertedCountryName(response.data.city.country).then(convertedCountryName => {
                document.querySelector(".foot1_anchor").addEventListener("click", function () {
                    window.location.href = `https://www.timeanddate.com/sun/${convertedCountryName}/${response.data.city.name}`;
                }) 
            });

            document.querySelector(".foot2_anchor").addEventListener("click", () => {
                window.location.href = `https://www.weatherandradar.co.uk/uv-index/${response.data.city.name}`;
            })
            
            // document.querySelector(".foot1_anchor").attributes.href.textContent = `https://www.timeanddate.com/sun/${getConvertedCountryName(response.data.city.country)}/${response.data.city.name}`;
            // console.log(document.querySelector(".foot1_anchor").attributes.href.textContent);
            
            document.querySelector(".fc1").innerHTML = ` ${Math.round(response.data.list[0].main.temp)}°C`;
            document.querySelector(".fc4").innerHTML = `  ${Math.round(response.data.list[5].main.temp)}°C`;
            document.querySelector(".fc7").innerHTML = `  ${Math.round(response.data.list[13].main.temp)}°C`;
            document.querySelector(".fc10").innerHTML = `  ${Math.round(response.data.list[17].main.temp)}°C`;
            document.querySelector(".fc13").innerHTML = `  ${Math.round(response.data.list[25].main.temp)}°C`;


            document.querySelector(".fc3").innerHTML = `${getDayName(response.data.list[0].dt_txt.split(" ")[0])}`
            // document.querySelectorAll(".fc3")[0].textContent = ` ${getDayName((response.data.list[0].dt_txt.split(" ")[0]))} `;
            // document.querySelectorAll(".fc3")[1].textContent = ` ${getDayName((response.data.list[0].dt_txt.split(" ")[0]))} `;

            // document.querySelectorAll(".fc6")[0].textContent = ` ${getDayName((response.data.list[5].dt_txt.split(" ")[0]))} `;
            // document.querySelectorAll(".fc6")[1].textContent = ` ${getDayName((response.data.list[5].dt_txt.split(" ")[0]))} `;
            document.querySelector(".fc6").textContent = ` ${getDayName((response.data.list[5].dt_txt.split(" ")[0]))}`;
            document.querySelector(".fc9").textContent = ` ${getDayName((response.data.list[13].dt_txt.split(" ")[0]))}`;
            document.querySelector(".fc12").textContent = ` ${getDayName((response.data.list[17].dt_txt.split(" ")[0]))}`;
            document.querySelector(".fc15").textContent = ` ${getDayName((response.data.list[25].dt_txt.split(" ")[0]))}`;

            document.querySelector(".fc2").innerHTML =
                `<img src="http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png" alt="Weather Icon">`;
            document.querySelector(".fc5").innerHTML =
                `<img src="http://openweathermap.org/img/wn/${response.data.list[5].weather[0].icon}@2x.png" alt="Weather Icon">`;
            document.querySelector(".fc8").innerHTML =
                `<img src="http://openweathermap.org/img/wn/${response.data.list[13].weather[0].icon}@2x.png" alt="Weather Icon">`;
            document.querySelector(".fc11").innerHTML =
                `<img src="http://openweathermap.org/img/wn/${response.data.list[17].weather[0].icon}@2x.png" alt="Weather Icon">`;
            document.querySelector(".fc14").innerHTML =
                `<img src="http://openweathermap.org/img/wn/${response.data.list[25].weather[0].icon}@2x.png" alt="Weather Icon">`;
        })
        .catch(function (error) {
            console.log(error);
            document.querySelector("#response").innerHTML = 'Error in getting weather data';
        });
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`)
        .then(function (response) {
            console.log(response);
            // document.querySelector("#img2nd").innerHTML = 
            // `<img src="http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png" alt="Weather Icon">`;

            // document.querySelector("#response").innerHTML = 
            //     ` ${response.data.main.temp}°C`;
            document.querySelector("#response").innerHTML =
                `${response.data.name}`;
            //     document.querySelector("#description").innerHTML = 
            //     ` ${response.data.weather[0].description}`;
            document.querySelector("#max").innerHTML =
                ` ${response.data.main.temp_max}°`;
            document.querySelector("#min").innerHTML =
                ` ${response.data.main.temp_min}°`;
        })

        .catch(function (error) {
            console.log(error.data);
            document.querySelector("#response").innerHTML = 'Error in gettingg weather data';
        });


}

function getDayName(dateString) {
    let date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: 'short' });
    // return dayFullName.slice(0, 3);
}

function getAQIData(lat, lon, API_key) {
    axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`)
        .then(function (response) {
        console.log("g", response.data);
        getAQI(response);
    });

}

function getUVIndex(response) {
    let uv = response.data.list[0].wind.deg;
    if (uv >= 11) {
        uv = 11;
    }
    document.querySelector(".inner5").innerHTML = uv;

    getUVResponse(uv)

}

function getUVResponse(uv) {
    let response;
    if (uv >= 0 && uv <= 2) {
        response = "Low";
    }

    else if (uv >= 3 && uv <= 5) {
        response = "Moderate";
    }

    else if (uv >= 6 && uv <= 7) {
        response = "High";
    }
    else if (uv >= 8 && uv <= 10) {
        response = "Very High";
    }

    else {
        response = "Extreme";
    }
    document.querySelector(".inner6").innerHTML = response;
}

function getSunriseTime(response) {

    let sunriseTimestamp = response.data.city.sunrise;

    // Convert to milliseconds
    let sunriseDate = new Date(sunriseTimestamp * 1000);

    // Extract hours and minutes
    let hours = sunriseDate.getHours();
    let minutes = sunriseDate.getMinutes();

    // Convert to 12-hour format and determine AM/PM
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12

    // Format time properly (adding leading zero if needed)
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    // console.log("Sunrise Time in Karachi:", formattedTime);

    document.getElementById("sunrise").innerHTML = formattedTime;

}

function getSunsetTime(response) {
    let sunsetTimestamp = response.data.city.sunset;

    // Convert to milliseconds
    let sunsetDate = new Date(sunsetTimestamp * 1000);

    // Extract hours and minutes
    let hours = sunsetDate.getHours();
    let minutes = sunsetDate.getMinutes();

    // Convert to 12-hour format and determine AM/PM
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 (midnight) to 12

    // Format time properly (adding leading zero if needed)
    let formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    // console.log("Sunset Time in Karachi:", formattedTime);

    document.querySelector(".sunset").innerHTML = formattedTime;
}

function getAQI(response) {
    // let CO = response.data.list[0].components.co;


    let NO2 = response.data.list[0].components.no2;
    let O3 = response.data.list[0].components.o3;
    let PM2_5 = response.data.list[0].components.pm2_5;
    let PM10 = response.data.list[0].components.pm10;
    let SO2 = response.data.list[0].components.so2;

    let aqi = getaqivalue(NO2, O3, PM2_5, PM10, SO2);
    console.log(aqi);
    let Response;
    if (aqi >= 0 && aqi <= 50) {
        Response = "Good";

    } else if (aqi >= 51 && aqi <= 100) {
        Response = "Moderate";
    } else if (aqi >= 101 && aqi <= 150) {
        Response = "Low Health Risk";
    } else if (aqi >= 151 && aqi <= 200) {
        Response = "Unhealthy";
    } else if (aqi >= 201 && aqi <= 300) {
        Response = "Very Unhealthy";
    } else {
        Response = "Hazardous";
    }
    document.querySelector(".aqi").innerHTML = ` ${aqi}-${Response}`;

}

function getaqivalue(NO2, O3, PM2_5, PM10, SO2) {
    // let F_co = getF_co(CO);

    let F_no2 = getF_no2(NO2);
    let F_o3 = getF_o3(O3);
    let F_pm2_5 = getF_pm2_5(PM2_5);
    let F_pm10 = getF_pm10(PM10);
    let F_so2 = getF_so2(SO2);
    // console.log(F_co);

    return Math.round(Math.max(F_no2, F_o3, F_pm2_5, F_pm10, F_so2));
}
// function getF_co(CO) {
//   let i_low, i_high, c_low, c_high;
//   if (CO >= 0 && CO <= 4.4) {
//     i_low = 0; i_high = 50; c_low = 0; c_high = 4.4;
//   } else if (CO >= 4.5 && CO <= 9.4) {
//     i_low = 51; i_high = 100; c_low = 4.5; c_high = 9.4;
//   } else if (CO >= 9.5 && CO <= 12.4) {
//     i_low = 101; i_high = 150; c_low = 9.5; c_high = 12.4;
//   } else if (CO >= 12.5 && CO <= 15.4) {
//     i_low = 151; i_high = 200; c_low = 12.5; c_high = 15.4;
//   } else if (CO >= 15.5 && CO <= 30.4) {
//     i_low = 201; i_high = 300; c_low = 15.5; c_high = 30.4;
//   } else if (CO >= 30.5 && CO <= 40.4) {
//     i_low = 301; i_high = 400; c_low = 30.5; c_high = 40.4;
//   } else {
//     return 500; // Maximum hazardous level
//   }
//   let final = ((((i_high - i_low) / (c_high - c_low))) * (CO)) + (i_low);

//   return final;
// }


async function getConvertedCountryName(countryNameISO2) {
    try {
        const response = await axios.get("countryCodes.json");
        let countryName = response.data[countryNameISO2];        
        return countryName;    
    } catch (error) {
        console.error("Error fetching country codes:", error);
    }
}








function getF_no2(NO2) {
    let i_low;
    let i_high;
    let c_low;
    let c_high;
    if (NO2 >= 0 && NO2 <= 53) {
        i_low = 0;
        i_high = 50;
        c_low = 0;
        c_high = 53;
    } else if (NO2 >= 54 && NO2 <= 100) {
        i_low = 51;
        i_high = 100;
        c_low = 54;
        c_high = 100;
    } else {
        i_low = 101;
        i_high = 150;
        c_low = 101;
        c_high = 360;
    }
    let final = ((i_high - i_low) / (c_high - c_low)) * (NO2) + (i_low);
    return final;
}

function getF_o3(O3) {
    let i_low;
    let i_high;
    let c_low;
    let c_high;
    if (O3 >= 0 && O3 <= 54) {
        i_low = 0;
        i_high = 50;
        c_low = 0;
        c_high = 54;
    } else {
        i_low = 51;
        i_high = 100;
        c_low = 55;
        c_high = 70;
    }
    let final = ((((i_high - i_low) / (c_high - c_low))) * (O3)) + (i_low);

    return final;
}

function getF_pm2_5(PM2_5) {
    let i_low;
    let i_high;
    let c_low;
    let c_high;
    if (PM2_5 >= 0 && PM2_5 <= 12) {
        i_low = 0;
        i_high = 50;
        c_low = 0;
        c_high = 12;
    } else if (PM2_5 >= 12.1 && PM2_5 <= 35.4) {
        i_low = 51;
        i_high = 100;
        c_low = 12.1;
        c_high = 35.4;
    } else if (PM2_5 >= 35.5 && PM2_5 <= 55.4) {
        i_low = 101;
        i_high = 150;
        c_low = 35.5;
        c_high = 55.4;
    } else {
        i_low = 151;
        i_high = 200;
        c_low = 55.5;
        c_high = 150.4;
    }
    let final = ((((i_high - i_low) / (c_high - c_low))) * (PM2_5)) + (i_low);

    return final;
}

function getF_pm10(PM10) {
    let i_low;
    let i_high;
    let c_low;
    let c_high;
    if (PM10 >= 0 && PM10 <= 54) {
        i_low = 0;
        i_high = 50;
        c_low = 0;
        c_high = 54;
    } else if (PM10 >= 55 && PM10 <= 154) {
        i_low = 51;
        i_high = 100;
        c_low = 55;
        c_high = 154;
    } else {
        i_low = 101;
        i_high = 150;
        c_low = 155;
        c_high = 254;
    }
    let final = ((((i_high - i_low) / (c_high - c_low))) * (PM10)) + (i_low);

    return final;
}

function getF_so2(SO2) {
    let i_low;
    let i_high;
    let c_low;
    let c_high;
    if (SO2 >= 0 && SO2 <= 35) {
        i_low = 0;
        i_high = 50;
        c_low = 0;
        c_high = 35;
    } else if (SO2 >= 36 && SO2 <= 75) {
        i_low = 51;
        i_high = 100;
        c_low = 36;
        c_high = 75;
    } else {
        i_low = 101;
        i_high = 150;
        c_low = 76;
        c_high = 185;
    }
    let final = ((((i_high - i_low) / (c_high - c_low))) * (SO2)) + (i_low);

    return final;
}
