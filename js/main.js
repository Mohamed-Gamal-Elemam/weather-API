let today = document.getElementById("today");
let todayDate = document.getElementById("todayDate");
let monthName = document.getElementById("monthName");
let city = document.getElementById("city");
let todayTemp = document.getElementById("todayTemp");
let iconToday = document.getElementById("iconToday");
let todayDes = document.getElementById("todayDes");
let todayUmb = document.getElementById("todayUmb");
let todaywind = document.getElementById("todaywind");
let todaywindD = document.getElementById("todaywindD");

// ==nextDays

let tomoro = document.getElementsByClassName("tomoro");
let tomoroicon = document.getElementsByClassName("tomoroicon");
let tomoroTM = document.getElementsByClassName("tomoroTM");
let tomoroTi = document.getElementsByClassName("tomoroTi");
let tomoroDes = document.getElementsByClassName("tomoroDes");

// search
let searchInput = document.getElementById("nexdate");

// ------- fetch data
async function getdata(qCity) {
  let respons = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=279e7d80b0224e81b7a130259240601&q=${qCity}&days=3`
  );
  let responsdata = await respons.json();
  return responsdata;
}
// ______________________________________________
function displayToday(data) {
  city.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  iconToday.setAttribute("src", data.current.condition.icon);
  todayDes.innerHTML = data.current.condition.text;
  todayUmb.innerHTML = data.current.humidity + "%";
  todaywind.innerHTML = data.current.wind_kph + "KM/H";
  todaywindD.innerHTML = data.current.wind_dir;
  let dayDate = new Date();
  todayDate.innerHTML = dayDate.getDate();
  today.innerHTML = dayDate.toLocaleDateString("en-Us", { weekday: "long" });
  monthName.innerHTML = dayDate.toLocaleDateString("en-Us", { month: "long" });
}

// ----____________________________________________________

function displaynext(data) {
  let forecastDays = data.forecast.forecastday;
  for (i = 0; i < 2; i++) {
    tomoroTM[i].innerHTML = forecastDays[i + 1].day.maxtemp_c;
    tomoroTi[i].innerHTML = forecastDays[i + 1].day.mintemp_c;
    tomoroDes[i].innerHTML = forecastDays[i + 1].day.condition.text;
    tomoroicon[i].setAttribute("src", forecastDays[i + 1].day.condition.icon);
    let nexdate = new Date(forecastDays[i + 1].date);
    tomoro[i].innerHTML = nexdate.toLocaleDateString("en-Us", {
      weekday: "long",
    });
  }
}
async function startapp(city = "cairo") {
  let data = await getdata(city);
  displayToday(data);
  displaynext(data);
}

startapp();

searchInput.addEventListener("input", function () {
  startapp(searchInput.value);
});
