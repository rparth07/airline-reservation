export function bindPassenger() {
  addIncrementDecrementListener("adult");
  addIncrementDecrementListener("infant");
  addIncrementDecrementListener("child");
  countPassenger();
}

function addIncrementDecrementListener(person: string) {
  $(`#increment-${person}`).on(
    "click",
    {
      passengerTypeId: `#counting-${person}`,
      passengerType: person,
    },
    increment
  );

  $(`#decrement-${person}`).on(
    "click",
    {
      passengerTypeId: `#counting-${person}`,
      passengerType: person,
    },
    decrement
  );
}

function countPassenger() {
  let passagers =
    parseInt($("#counting-adult").text(), 10) +
    parseInt($("#counting-child").text(), 10) +
    parseInt($("#counting-infant").text(), 10);
  $("#travellersCount").text(passagers);
}

function increment(event: JQuery.ClickEvent) {
  let passengerTypeId: string = event.data.passengerTypeId;
  let passenger: string = event.data.passengerType;
  let currentValue: number = parseInt($(`#counting-${passenger}`).text(), 10);

  currentValue = currentValue + 1;
  event.data.passengerCount = currentValue;

  if (currentValue == 1) {
    $(`#decrement-${passenger}`).prop("disabled", false);
  }

  $(passengerTypeId).text(currentValue);

  countPassenger();
}

function decrement(event: JQuery.ClickEvent) {
  let passengerTypeId: string = event.data.passengerTypeId;
  let passenger: string = event.data.passengerType;
  let currentValue: number = parseInt($(`#counting-${passenger}`).text(), 10);

  currentValue -= 1;
  event.data.passengerCount = currentValue;

  $(passengerTypeId).text(currentValue);
  if (currentValue <= 0) {
    $("#decrement-" + passenger).prop("disabled", true);
  }
  countPassenger();
  return;
}
