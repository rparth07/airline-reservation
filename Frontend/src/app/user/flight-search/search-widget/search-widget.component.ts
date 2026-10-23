import {
  Component,
  OnDestroy,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
export class SearchWidgetComponent implements OnInit, OnDestroy {
  searching = false;
  searchError = '';
  get validationMessage() { return this.validSearch ? '' : 'Choose different airports, valid travel dates, and 1-9 passengers with at least one adult. Multicity dates must be in travel order.'; }
  private destroyed = new Subject<void>();
  queryParameters!: Params;
  oneWayRoundFormData!: OneWayRoundSearchWidget;
  multicityFormData!: MulticitySearchWidget;
  isSearchDisable: boolean = false;
  cityConfig!: CityConfig;
  multicityList: ItineraryDetail[] = [];
  draftLegs: { sourceCity: string | null; destinationCity: string | null; departureDate: string }[] = [];
  get airports() { return this.searchService.getCityList(); }
  readonly today = this.toInputDate(new Date());

  private toInputDate(value: Date): string {
    const date = new Date(value);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  beginMulticityEdit() {
    this.draftLegs = this.multicityList.map(leg => ({ ...leg, departureDate: this.toInputDate(leg.departureDate) }));
  }

  addDraftLeg() {
    if (this.draftLegs.length >= 5) return;
    const previous = this.draftLegs[this.draftLegs.length - 1];
    this.draftLegs.push({ sourceCity: previous?.destinationCity || null, destinationCity: null, departureDate: previous?.departureDate || this.today });
  }

  removeDraftLeg(index: number) {
    if (this.draftLegs.length > 2) this.draftLegs.splice(index, 1);
  }

  get draftError(): string {
    for (let i = 0; i < this.draftLegs.length; i++) {
      const leg = this.draftLegs[i];
      if (leg.sourceCity && leg.sourceCity === leg.destinationCity) return `Flight ${i + 1}: choose different departure and arrival airports.`;
      if (leg.departureDate && leg.departureDate < this.today) return `Flight ${i + 1}: choose today or a future date.`;
      if (i && leg.departureDate && leg.departureDate < this.draftLegs[i - 1].departureDate) return `Flight ${i + 1}: departure must be on or after the previous flight.`;
    }
    return '';
  }

  get draftValid(): boolean {
    return this.draftLegs.length >= 2 && this.draftLegs.length <= 5 && !this.draftError && this.draftLegs.every(leg =>
      !!leg.sourceCity && !!leg.destinationCity && /^\d{4}-\d{2}-\d{2}$/.test(leg.departureDate) &&
      this.airports.some(city => city.abbreviation === leg.sourceCity) && this.airports.some(city => city.abbreviation === leg.destinationCity));
  }

  applyMulticityEdit(): boolean {
    if (!this.draftValid) return false;
    this.multicityList = this.draftLegs.map(leg => ({ ...leg, departureDate: new Date(leg.departureDate + 'T00:00:00') }));
    this.setCityConfig();
    this.onValueChanged();
    return true;
  }
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
    this.route.data.pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.queryParameters = this.route.snapshot.queryParams;
      this.selectedTripType = this.route.snapshot.params['tripType'];
      this.oneWayRoundFormData = undefined as any;
      this.multicityFormData = undefined as any;
      if (this.queryParameters['tripType'] === DomainConstants.QueryParamsTripType.MULTICITY) {
        this.multicityFormData = this.searchService.getMulticityDataFromQuery(this.queryParameters);
      } else {
        this.oneWayRoundFormData = this.searchService.getOneWayRoundDataFromQuery(this.queryParameters);
      }
      this.selectedFlightClass = (this.oneWayRoundFormData || this.multicityFormData).flightClass;
      this.setMultiListFromMulticityFormData();
      this.setCityConfig();
      this.clearResultEvent.emit(false);
    });

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
    this.beginMulticityEdit();
    this.modalService.open(content, {
      size: 'lg', centered: true, windowClass: 'multicity-editor-window',
      ariaLabelledBy: 'multicity-editor-title', ariaDescribedBy: 'multicity-editor-description',
      backdrop: 'static', keyboard: true,
    }).result.catch(() => { /* Dismissal discards the isolated draft. */ });
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

  get validSearch(): boolean {
    const pax = (this.oneWayRoundFormData || this.multicityFormData)?.ridership;
    if (!pax || pax.adult < 1 || pax.infant > pax.adult || pax.adult + pax.child + pax.infant > 9) return false;
    if (this.selectedTripType === this.multicity) {
      return this.multicityList.length >= 2 && this.multicityList.every((leg, i, all) =>
        !!leg.sourceCity && !!leg.destinationCity && leg.sourceCity !== leg.destinationCity &&
        (!i || new Date(leg.departureDate) >= new Date(all[i - 1].departureDate)));
    }
    const city = this.oneWayRoundFormData?.citySearch;
    const dates = this.oneWayRoundFormData?.tripDate;
    return !!city?.sourceCity && !!city.destinationCity && city.sourceCity !== city.destinationCity &&
      (this.selectedTripType !== DomainConstants.TripType.ROUND_TRIP || !!dates?.returnDate && dates.returnDate >= dates.departureDate);
  }

  async onSubmit(form: NgForm) {
    if (form.invalid || !this.validSearch || this.searching) return;
    this.searching = true;
    this.searchError = '';
    let queryParams;
    if (DomainConstants.TripType.MULTICITY === this.selectedTripType) {
      queryParams = this.getMulticityQueryParamsData(form.value);
    } else {
      queryParams = this.getOneWayRoundQueryParamsData(form.value);
    }

    try {
      await this.router.navigate(['user/flights/' + this.selectedTripType], { queryParams });
      this.clearResultEvent.emit(false);
    } catch {
      this.searchError = 'Search could not load. Your choices are saved; please try again.';
    } finally { this.searching = false; }
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

  ngOnDestroy() { this.destroyed.next(); this.destroyed.complete(); }

  onValueChanged() {
    if (this.selectedTripType !== this.multicity && !this.oneWayRoundFormData) {
      const first = this.multicityList[0];
      this.oneWayRoundFormData = {
        citySearch: { sourceCity: first?.sourceCity || null, destinationCity: first?.destinationCity || null },
        tripDate: { departureDate: DateFormatService.getFormattedDate(first?.departureDate || new Date(), DomainConstants.DateFormat) },
        flightClass: this.selectedFlightClass, ridership: this.multicityFormData.ridership, tripType: 'O'
      };
    }
    this.clearResultEvent.emit(true);
  }
}
