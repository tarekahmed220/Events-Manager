let eventName = document.querySelector("#eventName");
let eventOrg = document.querySelector("#eventOrg");
let eventDate = document.querySelector("#eventDate");
let addBtn = document.querySelector("#addBtn");
let events = document.querySelector(".newEvents");

function setMinDate() {
  let minDate = new Date().toISOString().split("T")[0];
  eventDate.min = minDate;
  eventDate.addEventListener("input", function () {
    if (eventDate.value < minDate);
    {
      eventDate.value = minDate;
    }
  });
}
setMinDate();

let eventInfo = [];
addBtn.addEventListener("click", function () {
  console.log(eventName.value, eventOrg.value, eventDate.value);
  if (eventName.value && eventOrg.value && eventDate.value) {
    let getEventInfo = JSON.parse(localStorage.getItem("eventInfo")) || [];
    let eventObj = {
      eventId: Date.now(),
      eventName: eventName.value,
      eventOrg: eventOrg.value,
      eventDate: eventDate.value,
    };
    getEventInfo.push(eventObj);
    localStorage.setItem("eventInfo", JSON.stringify(getEventInfo));
    displayEvent(eventObj);
  }
});

function displayEvent(event) {
  console.log(event);
  events.innerHTML += `
    <div class="event">
            <h3>${event.eventName}</h3>
            <div><span>By</span> ${event.eventOrg}</div>
            <div><span>On</span> ${event.eventDate}</div>
            <div><span>Time Left</span>1d 3h 40m 45s</div>
            <button onclick="deleteEvent(this)">Delete</button>
          </div>`;

  eventName.value = "";
  eventOrg.value = "";
  eventDate.value = "";
}

function deleteEvent(ele) {
  let event = ele.closest(".event");
  event.remove();
}
