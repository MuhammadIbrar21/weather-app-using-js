let cityName = document.getElementById('city');
let temp = document.getElementById('temp');
let icon = document.getElementById('icon');
let feelLike = document.getElementById('feels-like');
let windDir = document.getElementById('wind-dir');
let windSpeed = document.getElementById('wind-speed');
let humidity = document.getElementById('humidity');
let uvText = document.getElementById('uv');
let visibility = document.getElementById('visibility');
let airPressure = document.getElementById('airPressure');
let input = document.getElementById('userCity');
let app = document.getElementById('app');
let inputView = document.getElementById('input-area');
let submitBtn = document.getElementById('submitBtn');
let backBtn = document.getElementById('backBtn');

app.style.display = 'none';

submitBtn.onclick = function () {
    getWeather(input.value);
    app.style.display = 'block';
    inputView.style.display = 'none';
}
backBtn.onclick = function () {
    app.style.display = 'none';
    inputView.style.display = 'flex';
}

let condition = document.createElement('h3');
condition.id = 'condition';

let uvLevel = '';

function getWeather(city) {
    axios
        .get(
            "https://api.weatherapi.com/v1/current.json?key=222ba0d144ec4771ae720427241403&q=" +
            city +
            "&aqi=no"
        )
        .then(function (jawab) {
            temp.innerHTML = jawab.data.current.temp_c + ' &degC';
            icon.src = "https://" + jawab.data.current.condition.icon;
            cityName.innerHTML = `${jawab.data.location.name}, ${jawab.data.location.country}`;
            condition.innerHTML = jawab.data.current.condition.text;
            feelLike.innerHTML = jawab.data.current.feelslike_c + ' &degC';
            windDir.innerHTML = jawab.data.current.wind_dir + ' wind';
            windSpeed.innerHTML = jawab.data.current.wind_kph + ' km/h';
            humidity.innerHTML = jawab.data.current.humidity + '%';
            if (jawab.data.current.uv <= 2) {
                uvLevel = 'Low'
            } else if (jawab.data.current.uv > 2 && jawab.data.current.uv <= 5) {
                uvLevel = 'Moderate'
            } else if (jawab.data.current.uv > 5 && jawab.data.current.uv <= 7) {
                uvLevel = 'High'
            } else {
                uvLevel = 'Very High'
            }
            uvText.innerText = jawab.data.current.uv + ` ${uvLevel}`;
            visibility.innerText = jawab.data.current.vis_km + ' km';
            airPressure.innerText = jawab.data.current.pressure_mb + ' hPa';
            temp.appendChild(condition);
        });
}