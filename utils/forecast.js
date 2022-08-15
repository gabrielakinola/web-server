const request = require("request");
const geocode = require("./geocode");

const weather = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1abca9ad80d041237953d9abaad6c215&query=${latitude},${longitude}&units=m`;

  request({ url: url, json: true }, (err, res) => {
    if (err) {
      callback(`Unable to connect to weatherstack api`);
    } else if (res.body.error) {
      callback("Please input the location coordinates using the querry string");
    } else {
      const data = res.body.current;
      callback(
        undefined,
        `${data.weather_descriptions[0]}. The temperature is currently ${data.temperature} degree celcius. It feels like ${data.feelslike} degree celcius out there`
      );
    }
  });
};

module.exports = weather;
