export function getCurrentPosition(options) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  }).then(position => {
    return {lat: position.coords.latitude, lng: position.coords.longitude};
  });
}

export function getGeoipPosition(options) {
  return fetch("/location").then(function(response) {
    if (!response.ok) throw "Could not resolve the IP location";
    return response.json();
  });
}

export function getCachedPosition() {
  return JSON.parse(localStorage.getItem("position"));
}

export function setCachedPosition(position) {
  localStorage.setItem("position", JSON.stringify(position));
}
