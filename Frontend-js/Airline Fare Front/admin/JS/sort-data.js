let sorted = false;
let currentProperty = "";
export function sortAirportData(propety, paginate) {
    let data = paginate.getElementData();
    if (currentProperty !== propety) {
        sorted = false;
        currentProperty = propety;
    }
    data.sort((a, b) => {
        let value1 = a[propety];
        let value2 = b[propety];
        return sortData(value1, value2);
    });
    sorted = !sorted ? true : false;
}
export function sortOperatorData(propety, paginate) {
    let data = paginate.getElementData();
    if (currentProperty !== propety) {
        sorted = false;
        currentProperty = propety;
    }
    data.sort((a, b) => {
        let value1 = a[propety];
        let value2 = b[propety];
        return sortData(value1, value2);
    });
    sorted = !sorted ? true : false;
}
export function sortFlightData(propety, paginate) {
    let data = paginate.getElementData();
    if (currentProperty !== propety) {
        sorted = false;
        currentProperty = propety;
    }
    data.sort((a, b) => {
        let value1 = a[propety];
        let value2 = b[propety];
        return sortData(value1, value2);
    });
    sorted = !sorted ? true : false;
}
function sortData(value1, value2) {
    if (sorted) {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return value2 - value1;
        }
        return value2.toString().localeCompare(value1.toString());
    }
    if (typeof value1 === "number" && typeof value2 === "number") {
        return value1 - value2;
    }
    return value1.toString().localeCompare(value2.toString());
}
