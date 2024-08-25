import { dateSelectorEventListener, bindTripTypeChangeEvent, } from "./airfair-extension.js";
var noOfCity = 1;
$(function () {
    bindTripTypeChangeEvent();
    // always show first itinerary item as selected
    const itineraryList = $(".multicity-item");
    $(itineraryList[0]).addClass("active-itinerary");
    // set click listener on itinerary List
    itineraryList.on("click", function (_event) {
        if ($(this).hasClass("active-itinerary")) {
            return;
        }
        // remove active class from all other items and add active class to selected list
        itineraryList.removeClass("active-itinerary");
        $(this).addClass("active-itinerary");
    });
    // set click listener on multiCityList
    const flightDetailList = $(".flight-details > .col > .card");
    flightDetailList.on("click", function (_event) {
        if ($(this).hasClass("active-flight")) {
            return;
        }
        // remove active class from all other items and add active to class to selected list
        flightDetailList.removeClass("active-flight");
        $(this).addClass("active-flight");
    });
    // toggle city div
    $(".from-city").on("click", function () {
        $(".from-city-card").toggleClass("d-inline-block");
    });
    // for add and remove city
    const addCityButton = $("#add-city-button");
    $(addCityButton).on("click", function () {
        var parentToAppendBefore = $(this).parent();
        $(parentToAppendBefore).before(`<div class="row mr-ml-m0 p-2">
    <div class="city-selection col">
      <div class="row mr-ml-0">
        <div class="col-md-1 box-design">
          <span>Trip</span>
        </div>

        <div class="col box-design pr-2">
          <span>From</span>
          <input
            class="source-search- form-control"
            type="text"
            name="sourceCity"
            id="sourceCity"
            placeholder="SourceCity"
            value="Rajkot"
          />
        </div>
        <div class="col col-sm-6 col-xs-12 reverse-icon-multicity">
          <i class="fa fa-exchange" aria-hidden="true"></i>
        </div>
        <div class="col box-design">
          <span>To</span>
          <input
            class="destination-search-input form-control"
            type="text"
            name="destinationCity"
            id="destinationCity"
            placeholder="DestinationCity"
            value="Mumbai"
          />
        </div>
        <div class="col box-design">
          <label for="arrivalDate" class="form-label">Depart</label>
          <input
            class="mr-2 form-control departureDate"
            type="date"
            id="departureDate"
            value=""
            required
          />
        </div>

        <div class="col-md-1 justify-content-center">
          <button class="btn remove-city-button mt-3"> <img
          src="./Images/cancel.png"
        /></button>
        </div>
      </div>
    </div>
  </div>`);
        var addedCityRow = $(parentToAppendBefore).prev("div");
        removeMultipleCityListner(addedCityRow, $(this));
        noOfCity++;
        handlefromCityButtons($(this));
        dateSelectorEventListener();
    });
});
function removeMultipleCityListner(citySelection, addCityButton) {
    var removeButton = $(citySelection).find(".remove-city-button"); //".remove-city-button"
    $(removeButton).on("click", function () {
        if (noOfCity == 1) {
            return;
        }
        $(citySelection).remove();
        noOfCity--;
        handlefromCityButtons(addCityButton);
    });
}
function handlefromCityButtons(addCityButton) {
    if (noOfCity == 5) {
        $(addCityButton).prop("disabled", true);
    }
    else {
        $(addCityButton).prop("disabled", false);
    }
}
