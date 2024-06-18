let eventName = document.querySelector("#eventName");
let eventOrg = document.querySelector("#eventOrg");
let eventDate = document.querySelector("#eventDate");
let addBtn = document.querySelector("#addBtn");
let events = document.querySelector(".newEvents");

function setMinDate() {
  let today = new Date().toISOString().split("T")[0];
  eventDate.min = today;
  eventDate.addEventListener("input", function () {
    if (eventDate.value < today) {
      console.log("small");
      eventDate.value = today;
    }
  });
}
setMinDate();

addBtn.addEventListener("click", function () {
  if (eventName.value && eventOrg.value && eventDate.value) {
    var timeStamp = new Date(eventDate.value).getTime();
    let eventObj = {
      eventName: eventName.value,
      eventOrg: eventOrg.value,
      eventDate: eventDate.value,
      timeStamp: timeStamp,
    };

    let getEventInfo = JSON.parse(localStorage.getItem("getEventInfo")) || [];
    getEventInfo.push(eventObj);
    localStorage.setItem("getEventInfo", JSON.stringify(getEventInfo));
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
    });

    displayEvent();
  }
});
displayEvent();
var timeLeft;
var getEventInfo;
function displayEvent() {
  getEventInfo = JSON.parse(localStorage.getItem("getEventInfo")) || [];
  events.innerHTML = "";
  getEventInfo.map((element, index) => {
    let now = new Date().getTime();
    timeLeft = element.timeStamp - now;
    clearInterval(timeLeft, getEventInfo);
    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minsLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    let secnsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
    const countDown = `${daysLeft}d ${hoursLeft}h ${minsLeft}m ${secnsLeft}s`;

    events.innerHTML += `
    <div class="event" id="${element.timeStamp}">
            <h3>${element.eventName}</h3>
            <div><span>By</span> ${element.eventOrg}</div>
            <div><span>On</span> ${element.eventDate}</div>
            <div><span>Time Left</span>${countDown}</div>
            <button onclick="deleteEvent(${index})">Delete</button>
          </div>`;
  });
}
function deleteEvent(index) {
  let getEventInfo = JSON.parse(localStorage.getItem("getEventInfo"));
  getEventInfo.splice(index, 1);
  localStorage.setItem("getEventInfo", JSON.stringify(getEventInfo));
  displayEvent();
}

let intervel = setInterval(() => {
  displayEvent();
}, 1000);
