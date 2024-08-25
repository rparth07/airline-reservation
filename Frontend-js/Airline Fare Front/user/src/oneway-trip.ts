import {
  dateSelectorEventListener,
  bindTripTypeChangeEvent,
  bindSuggestionEvent,
  bindCloseSuggestionEvent,
  invertTripCity,
} from "./airfair-extension.js";
import { bindPassenger } from "./bind-passager.js";

$(function () {
  dateSelectorEventListener();

  $(".traveller").on("click", function () {
    $(".travellers-card").toggleClass("d-inline-block");
  });

  bindTripTypeChangeEvent();
  bindPassenger();

  invertTripCity(); // event listener for interchange city or airport
  bindSuggestionEvent(); // event listeners for Get Suggestion on Airport Box
  bindCloseSuggestionEvent(); // remove suggestion for outside click

  $("#search-button").on("click", function () {
    const multicity = "Multicity";

    if ($("#tripType").val() !== multicity) {
      if (!$(".arrivalDate").prop("disabled")) {
        window.location.href = "./round-trip.html";
      } else {
        window.location.href = "./oneway-trip.html";
      }
    } else {
      window.location.href = "./multicity-trip.html";
    }
  });

  // list of all flight detail cards
  const fligthDetailList = $(".flight-details > .col > .card");

  // set click listener on multiCityList
  fligthDetailList.on("click", function (_event: JQuery.ClickEvent) {
    if ($(this).hasClass("active-flight")) {
      return;
    }

    // remove active class from all other items
    fligthDetailList.removeClass("active-flight");

    // add active to class to selected list
    $(this).addClass("active-flight");
  });
});
