// 1. წამოიღეთ დატა მოცემული ლინკიდან და გამოიტანეთ საიტზე:latitude,longitude,timezone
// 2. current_weather(შესაბამისი საზომი ერთეულებით daily_units -დან ): temperature, windspeed, is_day
// 3. დღის მაქსიმალური და მინიმალური ტემპერატურა (temperature_2m_max,temperature_2m_min) 
// 4. მზის ამოსვლის/ჩასვლის დასაწყისი და დასასრული daily  -> (sunrise/sunset)
// 5. წვიმის/თოვლის შანსის უმაღლესი კოეფიციენტი (showers_sum/snowfall_sum)
// 6. ქარის მინიმალური/მაქსიმალური სიჩქარე
// 7. გამოიტანეთ დღიური დრო-ტემპერატურა  (hourly) -> (time,temperature_2m)
// 8. current_weather -> is_day:1 შემთხვევაში ბოდის ბექგრაუნდი იყოს რაიმე დღის სურათი, ხოლო is_day:0 შემთხვევაში ღამის ბექგრაუნდი


const fetchData = async () => {
    try {
      const resultData = await fetch("https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,showers_sum,snowfall_sum,windspeed_10m_max&current_weather=true&timezone=auto");
      const weatherData = await resultData.json();
      console.log(weatherData)

      

      const latitude = weatherData.latitude;
      const longitude = weatherData.longitude;
      const timeZone = weatherData.timezone;
      


      document.getElementById("latitude").textContent=`Latitude: ${latitude}`;
      document.getElementById("longitude").textContent=`Longitude: ${longitude}`;
      document.getElementById('timeZone').textContent = `Time Zone: ${timeZone}`;



      const currentWeather = weatherData.current_weather;
      const temperature=currentWeather.temperature;
      const windspeed=currentWeather.windspeed;
      const isDay =currentWeather.is_Day;

      document.getElementById("temperature").textContent=`Temperature: ${temperature}`
      document.getElementById("windspeed").textContent=`Windspeed: ${windspeed}`;
      document.getElementById("is_day").textContent= `Is day ${isDay}` ;

      const daily=weatherData.daily;      
      const temperature_2m_max = Math.max(...daily.temperature_2m_max);
      const temperature_2m_min = Math.min(...daily.temperature_2m_min);

      document.getElementById("maxTem").textContent=`Max Temperature: ${temperature_2m_max}`;
      document.getElementById("minTem").textContent=`Min Temperature: ${temperature_2m_min}`;

      
      const sunriseTimes = daily.sunrise;
      const sunsetTimes = daily.sunset;


      const firstSunrise = Date(...sunriseTimes);
      const firstSunset =Date(...sunsetTimes);
   

      document.getElementById('sunRise').textContent = `Sun Rise: ${firstSunrise}`;
      document.getElementById('sunSet').textContent = `Sun Set: ${firstSunset}`;

         // ორივე ერთიდაიგივეა :)) 
     
     const showersSum = daily.showers_sum;
     const snowfallSum = daily.snowfall_sum;

    const maxShowersSum = Math.max(...showersSum);
    const maxSnowfallSum = Math.max(...snowfallSum); 
     


     document.getElementById("showersSum").textContent=`Rain Expected: ${maxShowersSum} mm`;
     document.getElementById("snowfallSum").textContent=`Snow Expected: ${maxSnowfallSum} cm`;


    //  6. ქარის მინიმალური/მაქსიმალური სიჩქარე
    // windspeed_10m_max [32.5, 35.8, 9.9, 13.6, 10, 12.4, 6.5]

    const maxWindSpeed = daily.windspeed_10m_max;
    const minWindSpeed = daily.windspeed_10m_max;

    const windSpeedMax = Math.max(...maxWindSpeed);
    const windSpeedMin = Math.min(...minWindSpeed);

    document.getElementById("maxWindSpeed").textContent=windSpeedMax;
    document.getElementById("minWindSpeed").textContent=windSpeedMin;


    // 7. გამოიტანეთ დღიური დრო-ტემპერატურა  (hourly) -> (time,temperature_2m)



    const hour=weatherData.hourly;
    const time=hour.time;
    const timeNow = Date(...time);
    const temperatureNow=weatherData.current_weather.temperature;

    
    document.getElementById("currentTemperature").textContent = `${timeNow} - Temperature: ${temperatureNow}`;
   

    } catch (error) {
      console.log( error);
    }
  };

  fetchData();




