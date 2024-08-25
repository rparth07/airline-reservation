import { Operator } from "./components/operator-type.js";
import { Flight } from "./components/flight-type.js";
import { Airport } from "./components/airport-type.js";

export function printOperatorData(
  operatorList: Operator[],
  pageNumber: number,
  pageSize: number
): void {
  let start = (pageNumber + 1) * pageSize - pageSize + 1;
  operatorList.forEach((element) => {
    $("#operatorData").append(
      "<tr><th scope='col'>" +
        start +
        "</th><td>" +
        element.companyName +
        "</td><td>" +
        element.baseFare +
        "</td><td>" +
        element.convience +
        "</td><td>" +
        element.tax +
        "</td>" +
        '<td><a href="#"><i class="material-icons">border_color</i></a> <a href="#" class="ms-md-2 ms-lg-2 ms-sm-1"><i class="material-icons">delete</i></a> </td>' +
        "</tr>"
    );
    start++;
  });
}

export function printFlightData(
  flightList: Flight[],
  pageNumber: number,
  pageSize: number
): void {
  let start = (pageNumber + 1) * pageSize - pageSize + 1;

  flightList.forEach((element) => {
    $("#flightData").append(
      "<tr><th scope='col'>" +
        start +
        "</th><td>" +
        element.flightNumber +
        "</td><td>" +
        element.sourceCity +
        "</td><td>" +
        element.destinationCity +
        "</td><td>" +
        element.distance +
        "</td><td>" +
        element.startTime +
        "</td><td>" +
        element.endTime +
        "</td><td>" +
        element.operatingDays +
        "</td><td>" +
        element.flightOperator +
        "</td>" +
        '<td><a href="#" class="ms-2"><i class="material-icons">border_color</i></a> <a href="#" class="ms-md-0 ms-lg-0 ms-sm-1 ms-xl-1"><i class="material-icons">delete</i></a> </td>' +
        "</tr>"
    );
    start++;
  });
}

export function printAirportData(
  airportList: Airport[],
  pageNumber: number,
  pageSize: number
): void {
  let start = (pageNumber + 1) * pageSize - pageSize + 1;

  airportList.forEach((element) => {
    $("#airportData").append(
      "<tr><th scope='col'>" +
        start +
        "</th><td>" +
        element.name +
        "</td><td>" +
        element.abbrivation +
        "</td>" +
        '<td><a href="#" class="ms-2"><i class="material-icons">border_color</i></a> <a href="#" class="ms-md-2 ms-lg-2 ms-sm-1"><i class="material-icons">delete</i></a> </td>' +
        "</tr>"
    );
    start++;
  });
}
