import { Paginate } from "./paginate.js";
import { Airport } from "./components/airport-type.js";
import { printAirportData } from "./airfair-extension.js";
import { sortAirportData } from "./sort-data.js";
import {
  bindCloseSuggestionEvent,
  removeListForEmptySuggestions,
} from "./suggestion.js";

let airports: Airport[] = [
  { type: "airport", name: "Ahmedabad", abbrivation: "ABD" },
  { type: "airport", name: "Rajkot", abbrivation: "RAJ" },
  { type: "airport", name: "Mumbai", abbrivation: "BOM" },
  { type: "airport", name: "Hydrabad", abbrivation: "HYD" },
  { type: "airport", name: "Jaipur", abbrivation: "JAI" },
  { type: "airport", name: "Kolkata", abbrivation: "CCU" },
  { type: "airport", name: "Bhopal", abbrivation: "BPL" },
  { type: "airport", name: "Chennai", abbrivation: "CSK" },
  { type: "airport", name: "Thiruvanantpuram", abbrivation: "TRV" },
  { type: "airport", name: "Benglore", abbrivation: "BNG" },
  { type: "airport", name: "Mumbai", abbrivation: "BOM" },
  { type: "airport", name: "Kolkata", abbrivation: "CCU" },
  { type: "airport", name: "Jaipur", abbrivation: "JAI" },
  { type: "airport", name: "Ahmedabad", abbrivation: "ABD" },
];

$(function () {
  let paginateAirport = new Paginate(airports);

  changePageAndPrintData(paginateAirport, paginateAirport.getCurrentPage());

  $(".page-list").after(paginateAirport.pageGrid);

  $("#next").on("click", function () {
    paginateAirport.incrementCurrentPage();
    changePageAndPrintData(paginateAirport, paginateAirport.getCurrentPage());
  });

  $("#previous").on("click", function () {
    paginateAirport.decrementCurrentPage();
    changePageAndPrintData(paginateAirport, paginateAirport.getCurrentPage());
  });

  bindPageChangeEvent(paginateAirport);

  $("#add-airport-btn").on("click", function () {
    window.location.href = "./add-airport.html";
  });

  $("#add-airport-file").on("click", function () {
    $("#fileLoader").trigger("click");
  });

  $(".table-header").on("click", function () {
    const property: string = this.dataset.name as string;
    sortAirportData(property, paginateAirport);
    changePageAndPrintData(paginateAirport, paginateAirport.getCurrentPage());
  });

  $("#searchButton").on("click", function (event) {
    filterData(event, paginateAirport);
  });

  $("#search").on("search", function (event) {
    filterData(event, paginateAirport);
  });

  bindAirportSuggestionEvent(paginateAirport);
  bindCloseSuggestionEvent();
});

function filterData(event: JQuery.Event, paginateAirport: Paginate<Airport>) {
  event.preventDefault();
  let filteredAirports: Airport[] = [];
  let inputElement: HTMLInputElement, filter: string;
  inputElement = document.getElementById("search") as HTMLInputElement;
  filter = inputElement!.value.toUpperCase();

  let elementData = airports;

  filteredAirports = elementData.filter(function (airport) {
    return (
      airport.name.toUpperCase().indexOf(filter) > -1 ||
      airport.abbrivation.toUpperCase().indexOf(filter) > -1
    );
  });
 
 
  
  paginateAirport.changeFilterData(filteredAirports);
  $(".pageChange").remove();
  paginateAirport.setPageGrid();

  changePageAndPrintData(paginateAirport, paginateAirport.getCurrentPage());
  $(".page-list").after(paginateAirport.pageGrid);
  bindPageChangeEvent(paginateAirport);
}

function bindAirportSuggestionEvent(paginateAirport: Paginate<Airport>) {
  //display the suggestion container
  $("input").on("click", function () {
    const searchInput = "#search";

    $(searchInput).on("keyup", function () {
      let suggestionString = ".suggestions";
      let suggestionListElement = ".suggestions li";
      let keyUpInput = this as HTMLInputElement;
      $(suggestionString).css("display", "block");

      let input = keyUpInput.value;

      $(suggestionListElement).remove();

      let suggestions = airports.filter(function (airport) {
        return airport.name.toLowerCase().startsWith(input.toLowerCase());
      });
      suggestions =suggestions.filter((v, i, a) => a.indexOf(v) === i);
  
      suggestions.forEach(function (suggested) {
        let divElement = "<li>" + suggested.name + "</li>";
        $(suggestionString).append(divElement);
      });

      //isEmpty
      removeListForEmptySuggestions(
        input,
        suggestionListElement,
        suggestionString
      );

      //Place the suggestion in input box
      renderCityChoice(
        searchInput,
        suggestionListElement,
        suggestionString,
        paginateAirport
      );
    });
  });
}

function renderCityChoice(
  searchInput: string,
  suggestionListElement: string,
  suggestionString: string,
  paginateAirport: Paginate<Airport>
) {
  $(suggestionListElement).on("click", function (event) {
    $(searchInput).val(this.innerText);
    $(suggestionString).css("display", "none");
    filterData(event, paginateAirport);
  });
}

function bindPageChangeEvent(paginateAirport: Paginate<Airport>) {
  $(".pageChange").on("click", function () {
    changePageAndPrintData(
      paginateAirport,
      parseInt(this.getAttribute("data-page-number")!, 10)
    );
  });
}

function changePageAndPrintData(
  paginateAirport: Paginate<Airport>,
  currentPage: number
) {
  paginateAirport.pageChange(currentPage, "#airportData");

  printAirportData(
    paginateAirport.getCurrentPageData(),
    currentPage,
    paginateAirport.getPageSize()
  );
}
