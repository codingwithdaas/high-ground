// reads form, builds checklist, shows on page.

// helper: returns value of whichever radio button is checked in group (ex: getRadio("babies") gives "yes" or "no")
function getRadio(name) {
  return document.querySelector(`input[name="${name}"]:checked`).value;
}

// run when form submitted
document.getElementById("plan-form").addEventListener("submit", buildPlan);

function buildPlan(event) {
  event.preventDefault(); // stop the page from reloading

  // ---- Get answers from the form ----
  const people = Number(document.getElementById("people").value);
  const babies = getRadio("babies");
  const mobility = getRadio("mobility");
  const medication = getRadio("medication");
  const pets = document.getElementById("pets").value;
  const car = getRadio("car");
  const equipment = getRadio("equipment");

  const checklist = [];

  // base items (everyone gets these) 
  const baseItems = [
    "Flashlight and extra batteries",
    "First aid kit",
    "Phone charger or power bank",
    "Copies of IDs and important documents in a waterproof bag",
    "Some cash",
    "Change of clothes",
    "Whistle"
  ];
  for (const item of baseItems) {
    checklist.push(item);
  }

  // calculated items
  const water = people * 3; // 1 gallon per person per day, 3 days
  checklist.push("Water: " + water + " gallons (1 gallon per person per day, for 3 days)");
  checklist.push("Food: 3 days of non-perishable food for " + people + " people");

  // rules
  if (babies === "yes") {
    checklist.push("Diapers and wipes");
    checklist.push("Formula or baby food");
    checklist.push("Bottles");
  }

  if (mobility === "yes") {
    checklist.push("Mobility aids (walker, cane, wheelchair)");
    checklist.push("A plan for who will help them evacuate");
    checklist.push("Leave early, as soon as warnings start");
  }

  if (medication === "yes") {
    checklist.push("7-day supply of medications");
    checklist.push("Written list of medications and doses");
  }

  if (pets !== "none") {
    checklist.push("Pet food and water");
    checklist.push("Leash or carrier");
    checklist.push("Vet records");
  }

  if (car === "yes") {
    checklist.push("Keep the gas tank at least half full");
  } else {
    checklist.push("Arrange a ride in advance with a neighbor or family member");
    checklist.push("Plan to leave early");
  }

  if (equipment === "yes") {
    checklist.push("Backup battery or power source for medical equipment");
    checklist.push("Ask your utility about medical-needs programs");
  }

  // super superrr important: evacuation plan (everyone)
  checklist.push("Pick a meeting place outside your home");
  checklist.push("Choose an out-of-area contact person");
  checklist.push("Leave when officials say to. Don't wait");

  // show checklist on page
  showChecklist(checklist);
}

// displays each checklist item as list item on page
function showChecklist(items) {
  const list = document.getElementById("checklist");
  list.innerHTML = ""; // clear old list if submitted again

  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }

  document.getElementById("results").hidden = false;
}