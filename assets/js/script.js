const newName = document.getElementById('cityInput');

function GetInfo () {
  
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=49e1ee2816ba179df29ad03d6797358a')
    .then(response => response.json())
    .then(data => {
      for (i = 0; i < 5; i++) {
        document.getElementById('day' + (i + 1) + 'Min').innerHTML = 'Min: ' + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + '°'
      }

      for (i = 0; i < 5; i++) {
        document.getElementById('day' + (i + 1) + 'Max').innerHTML = 'Max: ' + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + '°'
      }

      for (i = 0; i < 5; i++) {
        document.getElementById('img' + (i + 1)).src = 'http://openweathermap.org/img/wn/' +
        data.list[i].weather[0].icon +
        '.png'
      }
      console.log(data)

      document.getElementById('weatherContainer').style.display = "block";
    })

    .catch(err => alert('Please enter a valid city name !'));

    
}

const d = new Date()
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function CheckDay (day) {
  if (day + d.getDay() > 6) {
    return day + d.getDay() - 7
  } else {
    return day + d.getDay()
  }
}

for (i = 0; i < 5; i++) {
  document.getElementById('day' + (i + 1)).innerHTML = weekday[CheckDay(i)]
}
