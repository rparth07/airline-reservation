import { Paginate } from "./paginate.js";
import { printFlightData } from "./airfair-extension.js";
import { sortFlightData } from "./sort-data.js";
import { bindCloseSuggestionEvent, removeListForEmptySuggestions, } from "./suggestion.js";
let flights = [
    {
        type: "flight",
        flightNumber: "GA-53",
        flightOperator: "GoAir",
        operatingDays: "Mon-Sun",
        sourceCity: "Ahmedabad",
        destinationCity: "Jaipur",
        startTime: "02:30:00",
        endTime: "03:50:00",
        distance: 541,
    },
    {
        type: "flight",
        flightNumber: "GA-53",
        flightOperator: "GoAir",
        operatingDays: "Mon-Sun",
        sourceCity: "Ahmedabad",
        destinationCity: "Mumbai",
        startTime: "02:30:00",
        endTime: "03:50:00",
        distance: 541,
    },
    {
        type: "flight",
        flightNumber: "GA-23",
        flightOperator: "GoAir",
        operatingDays: "Mon-Sun",
        sourceCity: "Delhi",
        destinationCity: "Chennai",
        startTime: "05:30:00",
        endTime: "08:30:00",
        distance: 1761,
    },
    {
        type: "flight",
        flightNumber: "IG-42",
        flightOperator: "IndiGo",
        operatingDays: "Sat-Sun",
        sourceCity: "Delhi",
        destinationCity: "Dubai",
        startTime: "06:50:01",
        endTime: "10:40:00",
        distance: 2207,
    },
    {
        type: "flight",
        flightNumber: "SP-12",
        flightOperator: "SpiceJet",
        operatingDays: "Sat-Sun",
        sourceCity: "Dubai",
        destinationCity: "Toronto",
        startTime: "12:00:00",
        endTime: "14:20:00",
        distance: 11071,
    },
    {
        type: "flight",
        flightNumber: "GA-41",
        flightOperator: "GoAir",
        operatingDays: "Sat-Sun",
        sourceCity: "Hydrabad",
        destinationCity: "vishakhapatnam",
        startTime: "14:30:01",
        endTime: "15:45:01",
        distance: 503,
    },
    {
        type: "flight",
        flightNumber: "IG-41",
        flightOperator: "IndiGo",
        operatingDays: "Mon-Sun",
        sourceCity: "Jaipur",
        destinationCity: "Delhi",
        startTime: "05:00:00",
        endTime: "06:00:00",
        distance: 241,
    },
    {
        type: "flight",
        flightNumber: "SP-34",
        flightOperator: "SpiceJet",
        operatingDays: "Sat-Sun",
        sourceCity: "Jammu",
        destinationCity: "Thiruvananthapuram",
        startTime: "08:30:00",
        endTime: "16:30:00",
        distance: 2754,
    },
    {
        type: "flight",
        flightNumber: "SP-36",
        flightOperator: "SpiceJet",
        operatingDays: "Sat-Sun",
        sourceCity: "Jammu",
        destinationCity: "Thiruvananthapuram",
        startTime: "08:30:02",
        endTime: "16:30:02",
        distance: 2754,
    },
    {
        type: "flight",
        flightNumber: "IG-38",
        flightOperator: "IndiGo",
        operatingDays: "Sat-Sun",
        sourceCity: "Thiruvananthapuram",
        destinationCity: "Banglore",
        startTime: "17:30:04",
        endTime: "18:30:04",
        distance: 544,
    },
    {
        type: "flight",
        flightNumber: "VS 213",
        flightOperator: "Vistara",
        operatingDays: "Mon-Sun",
        sourceCity: "Kolkata",
        destinationCity: "Banglore",
        startTime: "15:30:00",
        endTime: "17:30:00",
        distance: 1516,
    },
    {
        type: "flight",
        flightNumber: "SP-37",
        flightOperator: "SpiceJet",
        operatingDays: "Sat-Sun",
        sourceCity: "Mumbai",
        destinationCity: "Delhi",
        startTime: "11:00:03",
        endTime: "16:30:03",
        distance: 1154,
    },
    {
        type: "flight",
        flightNumber: "VS-40",
        flightOperator: "Vistara",
        operatingDays: "Sat-Sun",
        sourceCity: "Mumbai",
        destinationCity: "Hydrabad",
        startTime: "11:30:01",
        endTime: "12:50:01",
        distance: 622,
    },
    {
        type: "flight",
        flightNumber: "IG-98",
        flightOperator: "IndiGo",
        operatingDays: "Mon-Fri",
        sourceCity: "Raipur",
        destinationCity: "Mumbai",
        startTime: "15:30:00",
        endTime: "16:40:00",
        distance: 419,
    },
    {
        type: "flight",
        flightNumber: "SP-35",
        flightOperator: "SpiceJet",
        operatingDays: "Sat-Sun",
        sourceCity: "Rajkot",
        destinationCity: "Mumbai",
        startTime: "09:20:01",
        endTime: "10:30:01",
        distance: 419,
    },
    {
        type: "flight",
        flightNumber: "IG-39",
        flightOperator: "IndiGo",
        operatingDays: "Sat-Sun",
        sourceCity: "Rajkot",
        destinationCity: "Mumbai",
        startTime: "09:20:01",
        endTime: "10:30:01",
        distance: 419,
    },
];
$(function () {
    let paginateFlight = new Paginate(flights);
    changePageAndPrintData(paginateFlight, paginateFlight.getCurrentPage());
    $(".page-list").after(paginateFlight.pageGrid);
    bindPageChangeEvent(paginateFlight);
    $("#next").on("click", function () {
        paginateFlight.incrementCurrentPage();
        changePageAndPrintData(paginateFlight, paginateFlight.getCurrentPage());
    });
    $("#previous").on("click", function () {
        paginateFlight.decrementCurrentPage();
        changePageAndPrintData(paginateFlight, paginateFlight.getCurrentPage());
    });
    $("#add-flight-btn").on("click", function () {
        window.location.href = "./add-flight.html";
    });
    $("#add-flight-file").on("click", function () {
        $("#fileLoader").trigger("click");
    });
    $(".table-header").on("click", function () {
        const property = this.dataset.name;
        sortFlightData(property, paginateFlight);
        changePageAndPrintData(paginateFlight, paginateFlight.getCurrentPage());
    });
    $("#searchButton").on("click", function (event) {
        filterData(event, paginateFlight);
    });
    $("#search").on("search", function (event) {
        filterData(event, paginateFlight);
    });
    bindFlightSuggestionEvent(paginateFlight);
    bindCloseSuggestionEvent();
});
function filterData(event, paginateFlight) {
    event.preventDefault();
    let filteredFlights = [];
    var inputElement, filter;
    inputElement = document.getElementById("search");
    filter = inputElement.value.toUpperCase();
    let elementData = flights;
    filteredFlights = elementData.filter(function (flight) {
        return (flight.sourceCity.toUpperCase().indexOf(filter) > -1 ||
            flight.destinationCity.toUpperCase().indexOf(filter) > -1);
    });
    paginateFlight.changeFilterData(filteredFlights);
    $(".pageChange").remove();
    paginateFlight.setPageGrid();
    changePageAndPrintData(paginateFlight, paginateFlight.getCurrentPage());
    $(".page-list").after(paginateFlight.pageGrid);
    bindPageChangeEvent(paginateFlight);
}
function bindFlightSuggestionEvent(paginateFlight) {
    //display the suggestion container
    $("input").on("click", function () {
        const searchInput = "#search";
        $(searchInput).on("keyup", function () {
            let suggestionString = ".suggestions";
            let suggestionListElement = ".suggestions li";
            let keyUpInput = this;
            $(suggestionString).css("display", "block");
            let input = keyUpInput.value;
            $(suggestionListElement).remove();
            let suggestions = [];
            for (var flight of flights) {
                if (flight.sourceCity.toLowerCase().startsWith(input.toLowerCase()) &&
                    !suggestions.includes(flight.sourceCity)) {
                    suggestions.push(flight.sourceCity);
                }
                else if (flight.destinationCity
                    .toLowerCase()
                    .startsWith(input.toLowerCase()) &&
                    !suggestions.includes(flight.destinationCity)) {
                    suggestions.push(flight.destinationCity);
                }
            }
            suggestions.forEach(function (suggested) {
                let divElement = "<li>" + suggested + "</li>";
                $(suggestionString).append(divElement);
            });
            //isEmpty
            removeListForEmptySuggestions(input, suggestionListElement, suggestionString);
            //Place the suggestion in input box
            renderCityChoice(searchInput, suggestionListElement, suggestionString, paginateFlight);
        });
    });
}
function renderCityChoice(searchInput, suggestionListElement, suggestionString, paginateFlight) {
    $(suggestionListElement).on("click", function (event) {
        $(searchInput).val(this.innerText);
        $(suggestionString).css("display", "none");
        filterData(event, paginateFlight);
    });
}
function bindPageChangeEvent(paginateFlight) {
    $(".pageChange").on("click", function () {
        changePageAndPrintData(paginateFlight, parseInt(this.getAttribute("data-page-number"), 10));
    });
}
function changePageAndPrintData(paginateFlight, currentPage) {
    paginateFlight.pageChange(currentPage, "#flightData");
    printFlightData(paginateFlight.getCurrentPageData(), currentPage, paginateFlight.getPageSize());
}
