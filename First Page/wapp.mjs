  document.getElementById("weatherForm").onsubmit = function (event) {
  event.preventDefault();
  getweather();
};

function getweather() {
  let city = document.querySelector("#city").value;
  localStorage.setItem('city', city);
  window.location.href = "././Second Page/2nd.html"; // Navigate to second page
}

