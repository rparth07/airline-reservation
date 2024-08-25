import { Operator } from "./components/operator-type.js";
import { Flight } from "./components/flight-type.js";
import { Airport } from "./components/airport-type.js";

type PaginationElements = Flight | Operator | Airport;

export class Paginate<T extends PaginationElements> {
  private currentPage = 0;
  private pageLength = 0;
  private pageSize = 5;
  private currentPageData: T[] = [];
  private elementData: T[];
  pageGrid: string = "";

  constructor(paginateElement: T[]) {
    this.elementData = paginateElement;
    this.setPageGrid();
  }

  setPageGrid() {
    this.pageLength = Math.ceil(this.elementData.length / this.pageSize);
    this.pageGrid = "";
    for (let index = 0; index < this.pageLength; index++) {
      this.pageGrid += `<li class="page-item list-item 
        ${index == 0 ? 'active' : ''}
        pageChange" id="page-${index}" data-page-number= ${index} >
            <a class="page-link" href="#"> ${index + 1} </a>
          </li>`;
    }
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getPageSize() {
    return this.pageSize;
  }

  getCurrentPageData() {
    return this.currentPageData;
  }

  getElementData() {
    return this.elementData;
  }

  changeFilterData(data: T[]) {
    this.elementData = data;
    this.currentPage = 0;
  }

  incrementCurrentPage() {
    if (this.pageLength - 1 > this.currentPage) {
      this.currentPage += 1;
    }
  }

  decrementCurrentPage() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
    }
  }

  pageChange(pageNumber: number, dataClass: string) {
    $(".list-item").removeClass("active");
    $("#page-" + pageNumber).addClass("active");
    $(dataClass).html("");
    this.currentPage = pageNumber;
    this.setCurrentPageData();
  }

  private setCurrentPageData() {
    let start = this.pageSize * this.currentPage;
    let end = start + this.pageSize;

    this.currentPageData = this.elementData.slice(start, end);
  }
}
