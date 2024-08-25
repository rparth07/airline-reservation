import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Multicity } from 'src/app/shared/interfaces/multicity';
import { SearchService } from 'src/app/shared/services/search.service';
import { DatePipe } from '@angular/common';
import { ItineraryDetail } from 'src/app/shared/interfaces/itinerary-detail.model';

@Component({
  selector: 'app-multicity',
  templateUrl: './multicity.component.html',
  styleUrls: ['./multicity.component.css', '../home-page.component.css'],
})
export class MulticityComponent implements OnInit {
  tripCount: number = 2;
  @Input('tripType') isMulticity: boolean = true;

  multicityList: ItineraryDetail[] = [
    {
      sourceCity: null,
      destinationCity: null,
      departureDate: new Date(),
    },
  ];

  constructor(
    private router: Router,
    private searchService: SearchService,
    private datepipe: DatePipe
  ) {}

  ngOnInit(): void {}

  addTrip() {
    if (this.tripCount < 5) {
      this.tripCount++;
      this.multicityList.push({
        sourceCity: null,
        destinationCity: null,
        departureDate: new Date(),
      });
    }
  }
  removeTrip(index: number) {
    if (this.tripCount > 2) {
      this.tripCount--;
      this.multicityList.splice(index, 1);
    }
  }

  getTripsData(formData: Multicity) {
    console.log('formData=', formData);
    let departureDate = this.datepipe.transform(
      formData.tripDirection.departureDate,
      'dd/MM/yyyy'
    );
    console.log('this.multicityList=', this.multicityList);
    const tripsData = [
      `${formData.tripDirection.sourceCity}-${formData.tripDirection.destinationCity}-${departureDate}`,
    ];
    for (let trip of this.multicityList) {
      departureDate = this.datepipe.transform(trip.departureDate, 'dd/MM/yyyy');
      tripsData.push(
        `${trip.sourceCity}-${trip.destinationCity}-${departureDate}`
      );
    }
    return tripsData.join('_');
  }

  getMulticityQueryParamsData(formData: Multicity) {
    console.log('here=', formData);
    return {
      tripType: 'M',
      paxType: `A-${
        formData.ridership.adult == null ? 0 : formData.ridership.adult
      }_C-${
        formData.ridership.child == null ? 0 : formData.ridership.child
      }_I-${formData.ridership.infant == null ? 0 : formData.ridership.infant}`,
      cabinClass: formData.flightClass,
      itinerary: this.getTripsData(formData),
    };
  }

  redirect(multicitySearchForm: NgForm) {
    const MulticityForm = [
      multicitySearchForm.value.tripDirection,
      ...this.multicityList,
    ];
    let formData = multicitySearchForm.value;

    console.log(formData);
    console.log(MulticityForm);

    if (this.isMulticity) {
      this.router.navigate(['flights/multicity'], {
        queryParams: this.getMulticityQueryParamsData(formData),
      });
    }
  }
}
