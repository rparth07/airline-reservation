import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomainConstants } from '../../shared/domain-constants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, NgForm } from '@angular/forms';
import { SearchWidgetService } from './search-widget.service';
import { SearchService } from '../../shared/services/search.service';
import { ItineraryDetail } from '../../shared/interfaces/itinerary-detail.model';
import { DatePipe } from '@angular/common';
import { OneWayRoundSearchWidget } from 'src/app/shared/interfaces/one-way-round-search-widget';
import { Multicity } from 'src/app/shared/interfaces/multicity';
import { MulticitySearchWidget } from 'src/app/shared/interfaces/multicity-search-widget';
import { CityConfig } from 'src/app/shared/interfaces/city-search';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.css'],
})
export class SearchWidgetComponent implements OnInit {
  clearResults = false;
  queryParameters!: Params;
  oneWayRoundFormData!: OneWayRoundSearchWidget;

  multicityFormData!: MulticitySearchWidget;
  cityConfig!: CityConfig;

  @Output() clearResultEvent = new EventEmitter<boolean>();

  dateSelected = new Date();

  searchForm: FormGroup = new FormGroup({});
  multicityList: ItineraryDetail[] = [];

  tripTypes: string[] = [
    DomainConstants.TripType.ONEWAY,
    DomainConstants.TripType.ROUND_TRIP,
    DomainConstants.TripType.MULTI_CITY,
  ];

  multicity = DomainConstants.TripType.MULTI_CITY;

  selectedTripType: string = DomainConstants.TripType.ONEWAY;

  flightClassList = [
    DomainConstants.FlightClass.ECONOMY,
    DomainConstants.FlightClass.BUSINESS,
  ];

  selectedFlightClass: string = DomainConstants.FlightClass.ECONOMY;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private searchService: SearchService,
    private searchWidgetService: SearchWidgetService,
    private datePipe: DatePipe
  ) {
    this.route.params.subscribe((params: Params) => {
      this.selectedTripType = params['tripType'];
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.queryParameters = queryParams;
    });

    // console.log('queryParams=', this.queryParameters);
    if (this.queryParameters['tripType'] == 'M') {
      this.multicityFormData = this.searchService.getMulticityDataFromQuery(
        this.queryParameters
      );

      this.cityConfig = {
        sourceCity: this.multicityFormData.itineraryDetail[0].sourceCity,
        destinationCity:
          this.multicityFormData.itineraryDetail[
            this.multicityFormData.itineraryDetail.length - 1
          ].destinationCity,
      };
    } else {
      this.oneWayRoundFormData = this.searchService.getOneWayRoundDataFromQuery(
        this.queryParameters
      );
    }
    // console.log('formData as =', this.formData);
    this.selectedFlightClass = this.oneWayRoundFormData
      ? this.oneWayRoundFormData.flightClass
      : this.multicityFormData.flightClass;

    const multiCities = this.searchWidgetService.getCitySearchList();
    for (let city of multiCities) {
      this.multicityList.push({
        sourceCity: city.sourceCity,
        destinationCity: city.destinationCity,
        departureDate: city.departureDate,
      });
    }
  }

  onTripTypeChange() {
    // this.clearResults = true;
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
  // toggleMulticityCardDiv() {
  //   this.toggleMulticityCard = !this.toggleMulticityCard;
  // }

  open(content: any) {
    this.modalService.open(content, {
      modalDialogClass: 'modal-lg modal-dialog-centered',
    });
  }

  getOneWayQueryParamsData(formData: OneWayRoundSearchWidget) {
    const departureDate = this.datePipe.transform(
      formData.tripDate.departureDate,
      'dd/MM/yyyy'
    );
    return {
      tripType: 'O',
      paxType: `A-${
        formData.ridership.adult == null ? 0 : formData.ridership.adult
      }_C-${
        formData.ridership.child == null ? 0 : formData.ridership.child
      }_I-${formData.ridership.infant == null ? 0 : formData.ridership.infant}`,
      cabinClass: formData.flightClass,
      itinerary: `${formData.citySearch.sourceCity}-${formData.citySearch.destinationCity}-${departureDate}`,
    };
  }

  getRoundTripQueryParamsData(formData: OneWayRoundSearchWidget) {
    // console.log('round=', formData);

    const departureDate = this.datePipe.transform(
      formData.tripDate.departureDate,
      'dd/MM/yyyy'
    );
    const returnDate = this.datePipe.transform(
      formData.tripDate.returnDate,
      'dd/MM/yyyy'
    );
    return {
      tripType: 'R',
      paxType: `A-${
        formData.ridership.adult == null ? 0 : formData.ridership.adult
      }_C-${
        formData.ridership.child == null ? 0 : formData.ridership.child
      }_I-${formData.ridership.infant == null ? 0 : formData.ridership.infant}`,
      cabinClass: formData.flightClass,
      itinerary: `${formData.citySearch.sourceCity}-${formData.citySearch.destinationCity}-${departureDate}_${returnDate}`,
    };
  }

  getTripsData() {
    const tripsData = [];

    for (let trip of this.multicityList) {
      let departureDate = this.datePipe.transform(
        trip.departureDate,
        'dd/MM/yyyy'
      );
      tripsData.push(
        `${trip.sourceCity}-${trip.destinationCity}-${departureDate}`
      );
    }
    return tripsData.join('_');
  }

  getMulticityQueryParamsData(formData: Multicity) {
    // console.log('multi=', formData);
    return {
      tripType: 'M',
      paxType: `A-${
        formData.ridership.adult == null ? 0 : formData.ridership.adult
      }_C-${
        formData.ridership.child == null ? 0 : formData.ridership.child
      }_I-${formData.ridership.infant == null ? 0 : formData.ridership.infant}`,
      cabinClass: formData.flightClass,
      itinerary: this.getTripsData(),
    };
  }

  onSubmit(form: NgForm) {
    // console.log('form=', form.value);
    // console.log(this.multicityList);

    let queryParams;
    if (DomainConstants.TripType.ONEWAY === this.selectedTripType) {
      queryParams = this.getOneWayQueryParamsData(form.value);
    } else if (DomainConstants.TripType.ROUND_TRIP === this.selectedTripType) {
      queryParams = this.getRoundTripQueryParamsData(form.value);
    } else if (DomainConstants.TripType.MULTI_CITY === this.selectedTripType) {
      queryParams = this.getMulticityQueryParamsData(form.value);
    }
    this.router.navigate(['flights/' + this.selectedTripType], {
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
}
