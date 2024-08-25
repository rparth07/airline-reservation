import {
  dateSelectorEventListener,
  invertTripCity,
  bindCloseSuggestionEvent,
} from "./airfair-extension.js";
import { bindPassenger } from "./bind-passager.js";

let noOfCity = 2;

$(function () {
  $(".traveller").on("click", function () {
    $(".travellers-card").toggleClass("d-inline-block");
  });
  dateSelectorEventListener();
  invertTripCity();
  bindCloseSuggestionEvent();

  bindPassenger();

  $(".round-trip").on("click", function () {
    $("#returnDate").prop("disabled", false);
  });

  $(".oneway").on("click", function () {
    $("#returnDate").prop("disabled", true);
  });

  $(".search").on("click", function () {
    if ($(".active.oneway").length != 0) {
      window.location.href = "oneway-trip.html";
    } else if ($(".active.round-trip").length != 0) {
      window.location.href = "round-trip.html";
    } else {
      window.location.href = "multicity-trip.html";
    }
  });

  $("#addAnotherCity").on("click", function () {
    $("#multiCity>.search-container").before(`
    <div class="row ml-1 mt-3 mb-3">
                <div
                  class="col-lg-3 col-md-5 m-2 p-2 d-flex flex-column input-border rounded"
                >
                  <span class="upside-float">From</span>
                  <input
                    type="text"
                    class="source-search-input form-control mt-4 border-bottom"
                  />
                  <span class="reverse-icon">
                    <img
                      src="./Images/swap.png"
                      alt="reverse icon"
                    />
                  </span>
                </div>
                <div
                  class="col-lg-3 col-md-5 m-2 p-2 d-flex flex-column input-border rounded"
                >
                  <span class="upside-float">To</span>
                  <input
                    type="text"
                    class="destination-search-input form-control mt-4 border-bottom"
                  />
                </div>

                <div
                  class="col-lg-2 col-md-3 m-2 p-2 d-flex flex-column input-border rounded"
                >
                  <span class="upside-float">Departure</span>
                  <input
                    type="date"
                    id="departurDate"
                    class="form-control mt-4 border-bottom p-0 departureDate"
                  />
                </div>
                <button class="btn remove-city-button">
                <img
                src="./Images/cancel.png"
                />
                </button>
    </div>`);

    noOfCity++;

    if (noOfCity == 5) {
      //disble search button
      $(this).hide();
    }
    dateSelectorEventListener();
  });

  $(document).on("click", ".remove-city-button", function () {
    $(this).parent().remove();
    noOfCity--;
    if (noOfCity < 5) {
      $("#addAnotherCity").show();
    }
  });
});
