const newName = document.getElementById('cityInput')

function GetInfo () {
  const cityInput = document.getElementById('cityInput')
  const errorDiv = document.getElementById('errorDiv')

  // Fetch Openwethermap API
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=49e1ee2816ba179df29ad03d6797358a`)
    .then(response => response.json())
    .then(data => {
      for (i = 0; i < 5; i++) {
        const minTemperature = Number(data.list[i].main.temp_min - 273.15).toFixed(1)
        const weatherInfoText = `Min: ${minTemperature}°`
        document.getElementById('day' + (i + 1) + 'Min').innerHTML = weatherInfoText
      }

      for (i = 0; i < 5; i++) {
        const maxTemperature = Number(data.list[i].main.temp_max - 273.15).toFixed(1)
        const weatherInfoText = `Max: ${maxTemperature}°`
        document.getElementById('day' + (i + 1) + 'Max').innerHTML = weatherInfoText
      }

      for (i = 0; i < 5; i++) {
        const iconName = data.list[i].weather[0].icon
        const imageUrl = `http://openweathermap.org/img/wn/${iconName}.png`
        document.getElementById('img' + (i + 1)).src = imageUrl
      }
      console.log('Data from Openweather API: ', data)

      document.getElementById('weatherContainer').style.display = 'block'
    })

    .catch(err => {
      console.error('Error while fetching Openweather API: ', err)
      errorDiv.innerHTML = 'Please enter a valid city name !'
    })
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
