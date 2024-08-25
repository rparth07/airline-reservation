import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomainConstants } from '../../shared/domain-constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';
import { SearchService } from '../../shared/services/search.service';
import { ItineraryDetail } from '../../shared/interfaces/itinerary-detail.model';
import { CityConfig } from '../../shared/interfaces/city-search';
import { DateSelection } from '../../shared/interfaces/date-selection';
import { Multicity } from '../../shared/interfaces/multicity';
import { MulticitySearchWidget } from '../../shared/interfaces/multicity-search-widget';
import { OneWayRoundSearchWidget } from '../../shared/interfaces/one-way-round-search-widget';
import { DateFormatService } from '../../shared/services/date-format.service';
import { FlightSelectionService } from '../flight-selection.service';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.css'],
})
export class SearchWidgetComponent implements OnInit {
  queryParameters!: Params;
  oneWayRoundFormData!: OneWayRoundSearchWidget;
  multicityFormData!: MulticitySearchWidget;
  isSearchDisable: boolean = false;
  cityConfig!: CityConfig;
  multicityList: ItineraryDetail[] = [];
  multicity: string = DomainConstants.TripType.MULTICITY;
  selectedTripType: string = DomainConstants.TripType.ONE_WAY;
  selectedFlightClass: string = DomainConstants.FlightClass.ECONOMY;

  tripTypes: string[] = [
    DomainConstants.TripType.ONE_WAY,
    DomainConstants.TripType.ROUND_TRIP,
    DomainConstants.TripType.MULTICITY,
  ];

  flightClassList: string[] = [
    DomainConstants.FlightClass.ECONOMY,
    DomainConstants.FlightClass.BUSINESS,
  ];

  @Output() clearResultEvent = new EventEmitter<boolean>();

  @ViewChild('form', { static: true }) ngForm!: NgForm;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private searchService: SearchService,
    private flightSelectionService: FlightSelectionService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.selectedTripType = params['tripType'];
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParameters = queryParams;
    });

    this.searchService.disableSearch.subscribe((isSearchDisable: boolean) => {
      this.isSearchDisable = isSearchDisable;
    });

    if (
      this.queryParameters['tripType'] ==
      DomainConstants.QueryParamsTripType.MULTICITY
    ) {
      this.multicityFormData = this.searchService.getMulticityDataFromQuery(
        this.queryParameters
      );
    } else {
      this.oneWayRoundFormData = this.searchService.getOneWayRoundDataFromQuery(
        this.queryParameters
      );
    }

    this.selectedFlightClass = this.oneWayRoundFormData
      ? this.oneWayRoundFormData.flightClass
      : this.multicityFormData.flightClass;

    this.setMultiListFromMulticityFormData();
    this.setCityConfig();

    this.flightSelectionService.selectedFlightSummary = [];
  }

  setMultiListFromMulticityFormData() {
    this.multicityList = [];
    if (this.multicityFormData) {
      this.multicityList = this.multicityFormData.itineraryDetail.map(
        (itinerary) => {
          return { ...itinerary };
        }
      );
    } else {
      // push two empty list
      this.onAddCity();
      this.onAddCity();
    }
  }

  private setCityConfig() {
    if (this.multicityList.length) {
      this.cityConfig = {
        sourceCity: this.multicityList[0].sourceCity,
        destinationCity:
          this.multicityList[this.multicityList.length - 1].destinationCity,
      };
    }
  }

  onDataChange() {
    this.clearResultEvent.emit(true);
  }

  getEmptyTemplate() {
    const templateItineraryDetail: ItineraryDetail = {
      sourceCity: null,
      destinationCity: null,
      departureDate: new Date(),
    };

    return { ...templateItineraryDetail };
  }

  open(content: any) {
    this.modalService.open(content, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
      backdrop: 'static',
      keyboard: false,
    });
  }

  private isRoundTrip() {
    return DomainConstants.TripType.ROUND_TRIP === this.selectedTripType;
  }

  private getItinerarySuffix(tripDate: DateSelection): string {
    const departureDate = DateFormatService.getFormattedDate(
      tripDate.departureDate,
      DomainConstants.QueryParamsDateFormat
    );
    let itinerarySuffix = departureDate;
    if (this.isRoundTrip()) {
      const returnDate = DateFormatService.getFormattedDate(
        tripDate.returnDate!,
        DomainConstants.QueryParamsDateFormat
      );
      itinerarySuffix += `_${returnDate}`;
    }
    return itinerarySuffix;
  }

  private getQueryParamsTripType(): string {
    let tripType = DomainConstants.QueryParamsTripType.ONE_WAY;
    if (this.isRoundTrip()) {
      tripType = DomainConstants.QueryParamsTripType.ROUND_TRIP;
    }

    return tripType;
  }

  getOneWayRoundQueryParamsData(formData: OneWayRoundSearchWidget) {
    return {
      tripType: this.getQueryParamsTripType(),
      paxType: this.searchService.getPaxType(formData.ridership),
      cabinClass: formData.flightClass,
      itinerary: `${formData.citySearch.sourceCity}-${
        formData.citySearch.destinationCity
      }-${this.getItinerarySuffix(formData.tripDate)}`,
    };
  }

  getTripsData() {
    const tripsData: string[] = [];

    return this.searchService.populateMulticityTripsData(
      tripsData,
      this.multicityList
    );
  }

  getMulticityQueryParamsData(formData: Multicity) {
    return {
      tripType: DomainConstants.QueryParamsTripType.MULTICITY,
      paxType: this.searchService.getPaxType(formData.ridership),
      cabinClass: formData.flightClass,
      itinerary: this.getTripsData(),
    };
  }

  onSubmit(form: NgForm) {
    let queryParams;
    if (DomainConstants.TripType.MULTICITY === this.selectedTripType) {
      queryParams = this.getMulticityQueryParamsData(form.value);
    } else {
      queryParams = this.getOneWayRoundQueryParamsData(form.value);
    }

    this.router.navigate(['user/flights/' + this.selectedTripType], {
      queryParams: queryParams,
    });

    this.clearResultEvent.emit(false);
  }

  onAddCity() {
    if (this.multicityList.length < 5) {
      this.multicityList.push({
        sourceCity: null,
        destinationCity: null,
        departureDate: new Date(),
      });
    }
  }

  onDeleteCity(index: number) {
    if (this.multicityList.length > 2) {
      this.multicityList.splice(index, 1);
    }
  }

  saveMulticityList() {
    this.setCityConfig();
  }

  onValueChanged() {
    this.clearResultEvent.emit(true);
  }
}
