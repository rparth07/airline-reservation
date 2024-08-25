var airports = [
    { name: "Rajkot,India" },
    { name: "Rampur,India" },
    { name: "Raipur,India" },
    { name: "Ranpur,India" },
    { name: "Raigadha,India" },
    { name: "Mumbai,India" },
    { name: "Pune,India" },
    { name: "Delhi,India" },
    { name: "Surat,India" },
    { name: "Dubai,Saudi" },
    { name: "Tokyo,Japan" },
    { name: "LA,USA" },
];
var DateType;
(function (DateType) {
    DateType["departurDateSelector"] = ".departureDate";
    DateType["arrivalDateSelector"] = ".arrivalDate";
})(DateType || (DateType = {}));
export function dateSelectorEventListener() {
    setDate();
    dateSelectorOnChangeEventListener();
    showReturnDateEventListener();
}
function setDate() {
    let date = new Date();
    const DD = date.getDate();
    const MM = date.getMonth() + 1; //January is 0!
    const YYYY = date.getFullYear();
    let day = DD.toString();
    let month = MM.toString();
    let year = YYYY.toString();
    if (DD < 10) {
        day = "0" + DD;
    }
    if (MM < 10) {
        month = "0" + MM;
    }
    const TODAY = year + "-" + month + "-" + day;
    $(DateType.departurDateSelector).val(TODAY);
    $(DateType.arrivalDateSelector).val(TODAY);
    $(DateType.departurDateSelector).attr("min", TODAY);
    $(DateType.arrivalDateSelector).attr("min", TODAY);
}
function dateSelectorOnChangeEventListener() {
    $(DateType.departurDateSelector).on("change", function () {
        var thisElement = this;
        $(DateType.arrivalDateSelector).attr("min", thisElement.value);
        $(DateType.arrivalDateSelector).val(thisElement.value);
    });
}
function showReturnDateEventListener() {
    $("#return-date-box").on("click", function () {
        $(DateType.arrivalDateSelector).prop("disabled", false);
    });
}
export function bindTripTypeChangeEvent() {
    const onewayTrip = "Oneway";
    const roundTrip = "Round-trip";
    const multicityTrip = "Multicity";
    const tripTypeElement = $("#tripType");
    tripTypeElement.change(function () {
        if (tripTypeElement.val() == onewayTrip) {
            window.location.href = "./oneway-trip.html";
        }
        else if (tripTypeElement.val() == roundTrip) {
            window.location.href = "./round-trip.html";
        }
        else if (tripTypeElement.val() == multicityTrip) {
            window.location.href = "./multicity-trip.html";
        }
    });
}
export function bindSuggestionEvent() {
    //display the suggestion container
    $("input").on("click", function () {
        let place = this.className.split("-")[0];
        let searchInput = "." + place + "-search-input";
        $(searchInput).on("keyup", function () {
            let suggestionString = "." + place + "-suggestions";
            let suggestionListElement = "." + place + "-suggestions li";
            let keyUpInput = this;
            $(suggestionString).css("display", "block");
            let input = keyUpInput.value;
            $(suggestionListElement).remove();
            let suggestions = airports.filter(function (airPort) {
                return airPort.name.toLowerCase().startsWith(input.toLowerCase());
            });
            suggestions.forEach(function (suggested) {
                let divElement = "<li>" + suggested.name + "</li>";
                $(suggestionString).append(divElement);
            });
            //isEmpty
            removeListForEmptySuggestions(input, suggestionListElement, suggestionString);
            //Place the suggestion in input box
            renderChoice(searchInput, suggestionListElement, suggestionString);
        });
    });
}
export function invertTripCity() {
    $(".reverse-icon").on("click", function () {
        const sourceSearchInput = ".source-search-input";
        const destinationSearchInput = ".destination-search-input";
        let sourceCity = $(sourceSearchInput).val();
        let destinationCity = $(destinationSearchInput).val();
        $(sourceSearchInput).val(destinationCity);
        $(destinationSearchInput).val(sourceCity);
    });
}
export function bindCloseSuggestionEvent() {
    $(document).on("mouseup", function (e) {
        var container = $(".travellers-card");
        var sourceSuggestionContainer = $(".source-suggestions");
        var destinationSuggestionContainer = $(".destination-suggestions");
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && !container.has(e.target).length) {
            container.removeClass("d-inline-block");
            sourceSuggestionContainer.css("display", "none");
            destinationSuggestionContainer.css("display", "none");
        }
    });
}
function removeListForEmptySuggestions(input, suggestionListElement, suggestionString) {
    if (input === "") {
        $(suggestionListElement).remove();
        $(suggestionString).css("display", "none");
    }
}
function renderChoice(searchInput, suggestionListElement, suggestionString) {
    $(suggestionListElement).on("click", function () {
        $(searchInput).val(this.innerText);
        $(suggestionString).css("display", "none");
    });
}
