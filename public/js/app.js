const inpSearchBtn = document.getElementById("inpSearchBtn");
const inpSearch = document.getElementById("inpSearch");
const Output_Msg = document.getElementById("Output_Msg");
const temp = document.getElementById("temp");
const tempStatus = document.getElementById("tempStatus");
const cityName = document.getElementById("cityName");
const datee = document.getElementById("Day");
const din = document.getElementById("din")
const hide_data = document.querySelector(".hide_data");

let url = "";
let data = "";
let searchValue = "";
let ApiWeatherDes = "";
let arryData = "";

// Date
let date_time = new Date();
var months = ['Jan', 'Feb' , 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Nov', 'Oct', 'Dec']
var currentMonth = months[date_time.getMonth()]
let currentDateofDay = date_time.getDate()
let currentYear = date_time.getFullYear();
datee.innerText = `${currentDateofDay} / ${currentMonth} / ${currentYear}`;

let weekday = date_time.getDay();
var weekdayString = ['Sun', 'Mon' , 'Tue', 'Wed', 'Thur','Fri', 'Sat'];
din.innerText = weekdayString[weekday];
// console.log(weekdayString[weekday]);


// Event search
const getValueFromSearch  = async(event) => {
    searchValue = inpSearch.value;
    event.preventDefault()
    if(searchValue === "") {
           Output_Msg.innerHTML = `<h5 id="Output_Msg" class="Output_Msg_err">Oop's! Please type a city name</h5>`
           hide_data.classList.add("hide_data");
           inpSearch.value = ""
    }
    else {
        try {
            url = `http://api.openweathermap.org/data/2.5/weather?q=${inpSearch.value}&units=metric&appid=d15c0ba591efec3993eef5e6fd0c0d90`;
            const response = await fetch(url);
            data = await response.json();
            arryData = [data];
   
            hide_data.classList.remove("hide_data");  

            // Weather Result In Card.
            let ApiCountry = arryData[0].sys.country;
            Output_Msg.innerText = ` ${searchValue} , ${ApiCountry}`;  //<h5 id="Output_Msg" class="Output_Msg">Get Output Here</h5>
            ApiWeatherDes = arryData[0].weather[0].description;
            temp.innerHTML =  `<p id="temp" class="finaltemp">${arryData[0].main.temp}<sup> &nbsp; 0</sup> C<span></span></p>`
            if (ApiWeatherDes === "Haze") {
                tempStatus.innerText = "Haze"
            }
            else if(ApiWeatherDes === "Rain") {
             tempStatus.innerHTML= `<i class="fas fa-cloud-rain"></i>`
            }
            else {
                tempStatus.innerHTML = `<i id="tempStatus" class="fas fa-cloud TempCondition"></i>`
            }
            inpSearch.value = ""
        } catch {
            Output_Msg.innerHTML = `<h5 id="Output_Msg" class="Output_Msg_err">${arryData[0].message}</h5>`
            hide_data.classList.add("hide_data");
            inpSearch.value = ""
        }
    }
    
}
inpSearchBtn.addEventListener("click", getValueFromSearch);