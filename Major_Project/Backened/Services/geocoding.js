//  Getting the geocode for the given address function.
const fetch = require("node-fetch");

module.exports.geocode = async (location) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

  const res = await fetch(url, {
    headers: { "User-Agent": "WonderLust-App" }
  });

  const data = await res.json();
  if (!data.length) return null;

  return {
    lat: data[0].lat,
    lng: data[0].lon
  };
};
