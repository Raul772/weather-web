const local = document.querySelector("#location p");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    local.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  local.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
}



