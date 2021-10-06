// const { response } = require("express");
// const fetch = require("node-fetch");

console.log("client side js has loaded");

fetch("/weather?address=jaipur").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.getElementById("form");

const search = document.getElementById("input");

const message1 = document.getElementById("message-1");
const message2 = document.getElementById("message-2");
const message3 = document.getElementById("message-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      message1.textContent = "latitude is :- " + data.data.latitude;
      message2.textContent = "longitude is :-" + data.data.longitude;
      message3.textContent = "location is :-" + data.data.location;
      console.log(data);
    });
  });
  // console.log(location);
});
