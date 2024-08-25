import {
  dateSelectorEventListener,
  bindTripTypeChangeEvent,
} from "./airfair-extension.js";

$(function () {
  bindTripTypeChangeEvent();

  const returnFlightDetailList = $(".return-flight-details > .col > .card");

  // set click listener on multiCityList
  returnFlightDetailList.on("click", function (_event: JQuery.ClickEvent) {
    // if flight is already selected then no need to perform actions
    if ($(this).hasClass("active-flight")) {
      return;
    }

    // remove active class from all other items
    returnFlightDetailList.removeClass("active-flight");

    // add active to class to selected list
    $(this).addClass("active-flight");
  });
  dateSelectorEventListener();
});
