const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZ2FicmllbGFraW5vbGEiLCJhIjoiY2w0c2dhMWw0MGZ6YjNkbnVtYmR0aW0zMyJ9.ZPwGcG48Xpv9LtblciUYqQ&limit=1`;

  request({ url: url, json: true }, (error, res) => {
    if (error) {
      callback("Unable to connect to location services!");
    } else if (res.body.features.length === 0) {
      callback("Unable to find location. Try another search");
    } else {
      const data = res.body.features[0].center;
      callback(undefined, {
        latitude: data[1],
        longitude: data[0],
        location: res.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
