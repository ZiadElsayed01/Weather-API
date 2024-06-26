// https://api.weatherapi.com/v1/forecast.json?key=ceb9219ab13d4f40b3e130651241806&q=cairo&days=3
async function search(location) {
  var http = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ceb9219ab13d4f40b3e130651241806&q=${location}&days=3`
  );
  var data = await http.json();
  display(data);
  console.log(data);
}
document.getElementById("search").addEventListener("keyup", function (e) {
  search(e.target.value);
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var date = new Date();
function display(data) {
  var content = ``;
  content += `
    <div class="col-md-4 px-0">
      <div class="box">
        <div
          class="box-header d-flex align-items-center justify-content-between p-3"
        >
          <p class="day my-0">${days[date.getDay()]}</p>
          <p class="date my-0">${[date.getDate()] + months[date.getMonth()]}</p>
        </div>
        <div class="box-content p-4">
          <p class="location my-0">${data.location.name}</p>
          <div class="degree d-flex py-4 flex-column">
            <h1 class="number text-white my-0">${
              data.current.temp_c
            }<sup>o</sup>C</h1>
            <div class="image">
              <img src="${data.current.condition.icon}" alt="" />
            </div>
          </div>
          <p class="text-info">${data.current.condition.text}</p>
          <span>
            <img src="Images/icon-umberella.png" alt="icon" class="me-1"/>
            20%
          </span>
          <span>
            <img src="Images/icon-wind.png" alt="icon" class="me-1"/>
            18km/h
          </span>
          <span>
            <img src="Images/icon-compass.png" alt="icon" class="me-1"/>
            East
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4 px-0 dark">
      <div class="box text-center">
        <div class="box-header p-3">
          <p class="day my-0">${days[date.getDay() + 1]}</p>
        </div>
        <div class="box-content p-4">
          <img src="${
            data.forecast.forecastday[1].day.condition.icon
          }" alt="" class="mb-4"/>
          <h4 class="text-white mb-4">${
            data.forecast.forecastday[1].day.maxtemp_c
          }<sup>o</sup>C</h4>
          <h5 class="mb-4">${
            data.forecast.forecastday[1].day.mintemp_c
          }<sup>o</sup></h5>
          <p class="text-info">${
            data.forecast.forecastday[1].day.condition.text
          }</p>
        </div>
      </div>
    </div>
    <div class="col-md-4 px-0">
      <div class="box text-center">
        <div class="box-header p-3">
          <p class="day my-0">${days[date.getDay() + 2]}</p>
        </div>
        <div class="box-content p-4">
          <img src="${
            data.forecast.forecastday[2].day.condition.icon
          }" alt="" class="mb-4"/>
          <h4 class="text-white mb-4">${
            data.forecast.forecastday[2].day.maxtemp_c
          }<sup>o</sup>C</h4>
          <h5 class="mb-4">${
            data.forecast.forecastday[2].day.mintemp_c
          }<sup>o</sup></h5>
          <p class="text-info">${
            data.forecast.forecastday[2].day.condition.text
          }</p>
        </div>
      </div>
    </div>
    `;
  document.getElementById("display").innerHTML = content;
}
navigator.geolocation.getCurrentPosition((position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  search(`${latitude},${longitude}`);
});
