import { Paginate } from "./paginate.js";
import { Operator } from "./components/operator-type.js";
import { printOperatorData } from "./airfair-extension.js";
import { sortOperatorData } from "./sort-data.js";
import {
  bindCloseSuggestionEvent,
  removeListForEmptySuggestions,
} from "./suggestion.js";

let operators: Operator[] = [
  {
    type: "operator",
    companyName: "IndiGo",
    baseFare: 5.0,
    tax: 12.9,
    convience: 499.0,
  },
  {
    type: "operator",
    companyName: "GoAir",
    baseFare: 5.5,
    tax: 13.3,
    convience: 599.0,
  },
  {
    type: "operator",
    companyName: "Vistara",
    baseFare: 6.0,
    tax: 14.0,
    convience: 655.0,
  },
  {
    type: "operator",
    companyName: "SpiceJet",
    baseFare: 6.2,
    tax: 17.0,
    convience: 669.0,
  },
  {
    type: "operator",
    companyName: "IndiGo",
    baseFare: 5.0,
    tax: 12.9,
    convience: 499.0,
  },
  {
    type: "operator",
    companyName: "GoAir",
    baseFare: 5.5,
    tax: 13.3,
    convience: 599.0,
  },
  {
    type: "operator",
    companyName: "Vistara",
    baseFare: 6.0,
    tax: 14.0,
    convience: 655.0,
  },
  {
    type: "operator",
    companyName: "SpiceJet",
    baseFare: 6.2,
    tax: 17.0,
    convience: 669.0,
  },
  {
    type: "operator",
    companyName: "IndiGo",
    baseFare: 5.0,
    tax: 12.9,
    convience: 499.0,
  },
  {
    type: "operator",
    companyName: "GoAir",
    baseFare: 5.5,
    tax: 13.3,
    convience: 599.0,
  },
  {
    type: "operator",
    companyName: "Vistara",
    baseFare: 6.0,
    tax: 14.0,
    convience: 655.0,
  },
  {
    type: "operator",
    companyName: "SpiceJet",
    baseFare: 6.2,
    tax: 17.0,
    convience: 669.0,
  },
  {
    type: "operator",
    companyName: "IndiGo",
    baseFare: 5.0,
    tax: 12.9,
    convience: 499.0,
  },
  {
    type: "operator",
    companyName: "GoAir",
    baseFare: 5.5,
    tax: 13.3,
    convience: 599.0,
  },
  {
    type: "operator",
    companyName: "Vistara",
    baseFare: 6.0,
    tax: 14.0,
    convience: 655.0,
  },
  {
    type: "operator",
    companyName: "SpiceJet",
    baseFare: 6.2,
    tax: 17.0,
    convience: 669.0,
  },
  {
    type: "operator",
    companyName: "IndiGo",
    baseFare: 5.0,
    tax: 12.9,
    convience: 499.0,
  },
  {
    type: "operator",
    companyName: "GoAir",
    baseFare: 5.5,
    tax: 13.3,
    convience: 599.0,
  },
  {
    type: "operator",
    companyName: "Vistara",
    baseFare: 6.0,
    tax: 14.0,
    convience: 655.0,
  },
  {
    type: "operator",
    companyName: "SpiceJet",
    baseFare: 6.2,
    tax: 17.0,
    convience: 669.0,
  },
  {
    type: "operator",
    companyName: "IndiGo",
    baseFare: 5.0,
    tax: 12.9,
    convience: 499.0,
  },
  {
    type: "operator",
    companyName: "GoAir",
    baseFare: 5.5,
    tax: 13.3,
    convience: 599.0,
  },
  {
    type: "operator",
    companyName: "Vistara",
    baseFare: 6.0,
    tax: 14.0,
    convience: 655.0,
  },
  {
    type: "operator",
    companyName: "SpiceJet",
    baseFare: 6.2,
    tax: 17.0,
    convience: 669.0,
  },
  {
    type: "operator",
    companyName: "IndiGo",
    baseFare: 5.0,
    tax: 12.9,
    convience: 499.0,
  },
  {
    type: "operator",
    companyName: "GoAir",
    baseFare: 5.5,
    tax: 13.3,
    convience: 599.0,
  },
  {
    type: "operator",
    companyName: "Vistara",
    baseFare: 6.0,
    tax: 14.0,
    convience: 655.0,
  },
  {
    type: "operator",
    companyName: "SpiceJet",
    baseFare: 6.2,
    tax: 17.0,
    convience: 669.0,
  },
];

$(function () {
  let paginateOperator = new Paginate(operators);

  changePageAndPrintData(paginateOperator, paginateOperator.getCurrentPage());
  $(".page-list").after(paginateOperator.pageGrid);

  $("#next").on("click", function () {
    paginateOperator.incrementCurrentPage();
    changePageAndPrintData(paginateOperator, paginateOperator.getCurrentPage());
  });

  $("#previous").on("click", function () {
    paginateOperator.decrementCurrentPage();
    changePageAndPrintData(paginateOperator, paginateOperator.getCurrentPage());
  });

  bindPageChangeEvent(paginateOperator);

  $("#add-operator-btn").on("click", function () {
    window.location.href = "./add-flight-operator.html";
  });
  $("#add-operator-file").on("click", function () {
    $("#fileLoader").trigger("click");
  });

  $(".table-header").on("click", function () {
    const property: string = this.dataset.name as string;

    sortOperatorData(property, paginateOperator);

    changePageAndPrintData(paginateOperator, paginateOperator.getCurrentPage());
  });

  $("#searchButton").on("click", function (event) {
    filterData(event, paginateOperator);
  });

  $("#search").on("search", function (event) {
    filterData(event, paginateOperator);
  });
  bindOpratorSuggestionEvent(paginateOperator);
  bindCloseSuggestionEvent();
});

function filterData(event: JQuery.Event, paginateOperator: Paginate<Operator>) {
  event.preventDefault();
  let filteredOperators: Operator[] = [];
  var inputElement: HTMLInputElement, filter: string;
  inputElement = document.getElementById("search") as HTMLInputElement;
  filter = inputElement!.value.toUpperCase();

  let elementData = operators;

  filteredOperators = elementData.filter(function (operator) {
    return operator.companyName.toUpperCase().indexOf(filter) > -1;
  });

  paginateOperator.changeFilterData(filteredOperators);
  $(".pageChange").remove();
  paginateOperator.setPageGrid();

  changePageAndPrintData(paginateOperator, paginateOperator.getCurrentPage());
  $(".page-list").after(paginateOperator.pageGrid);
  bindPageChangeEvent(paginateOperator);
}

function bindOpratorSuggestionEvent(paginateOperator: Paginate<Operator>) {
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

      let suggestions = operators.filter(function (operator) {
        return operator.companyName
          .toLowerCase()
          .startsWith(input.toLowerCase());
      });
      suggestions = suggestions.filter((v, i, a) => a.indexOf(v) === i);

      suggestions.forEach(function (suggested) {
        let divElement = "<li>" + suggested.companyName + "</li>";
        $(suggestionString).append(divElement);
      });

      //isEmpty
      removeListForEmptySuggestions(
        input,
        suggestionListElement,
        suggestionString
      );

      //Place the suggestion in input box
      renderOpratorChoice(
        searchInput,
        suggestionListElement,
        suggestionString,
        paginateOperator
      );
    });
  });
}

function renderOpratorChoice(
  searchInput: string,
  suggestionListElement: string,
  suggestionString: string,
  paginateOperator: Paginate<Operator>
) {
  $(suggestionListElement).on("click", function (event) {
    $(searchInput).val(this.innerText);
    $(suggestionString).css("display", "none");
    filterData(event, paginateOperator);
  });
}

function bindPageChangeEvent(paginateOperator: Paginate<Operator>) {
  $(".pageChange").on("click", function () {
    changePageAndPrintData(
      paginateOperator,
      parseInt(this.getAttribute("data-page-number")!, 10)
    );
  });
}

function changePageAndPrintData(
  paginateOperator: Paginate<Operator>,
  currentPage: number
) {
  paginateOperator.pageChange(currentPage, "#operatorData");

  printOperatorData(
    paginateOperator.getCurrentPageData(),
    currentPage,
    paginateOperator.getPageSize()
  );
}
