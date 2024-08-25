import { Operator } from "./components/operator-type.js";
import { Flight } from "./components/flight-type.js";
import { Airport } from "./components/airport-type.js";
import { Paginate } from "./paginate.js";

let sorted = false;
let currentProperty = "";
export function sortAirportData(propety: string, paginate: Paginate<Airport>) {
  let data: Airport[] = paginate.getElementData();
  if (currentProperty !== propety) {
    sorted = false;
    currentProperty = propety;
  }
  data.sort((a, b) => {
    let value1 = a[propety as keyof Airport];
    let value2 = b[propety as keyof Airport];

    return sortData(value1, value2);
  });

  sorted = !sorted;
}

export function sortOperatorData(
  propety: string,
  paginate: Paginate<Operator>
) {
  let data: Operator[] = paginate.getElementData();
  if (currentProperty !== propety) {
    sorted = false;
    currentProperty = propety;
  }
  data.sort((a, b) => {
    let value1 = a[propety as keyof Operator];
    let value2 = b[propety as keyof Operator];
    return sortData(value1, value2);
  });
  sorted = !sorted;
}

export function sortFlightData(propety: string, paginate: Paginate<Flight>) {
  let data: Flight[] = paginate.getElementData();
  if (currentProperty !== propety) {
    sorted = false;
    currentProperty = propety;
  }
  data.sort((a, b) => {
    let value1 = a[propety as keyof Flight];
    let value2 = b[propety as keyof Flight];
    return sortData(value1, value2);
  });
  sorted = !sorted;
}

function sortData(value1: String | number, value2: String | number) {
  if (sorted) {
    if (typeof value1 === "number" && typeof value2 === "number") {
      return (value2 as number) - (value1 as number);
    }
    return value2.toString().localeCompare(value1.toString());
  }

  if (typeof value1 === "number" && typeof value2 === "number") {
    return (value1 as number) - (value2 as number);
  }

  return value1.toString().localeCompare(value2.toString());
}
