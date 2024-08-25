import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ConnectedFlight } from 'src/app/shared/interfaces/response/connected-flights';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
})
export class FlightsComponent implements OnInit, AfterViewInit {
  selectedList = 0;

  @Input() flightInfoList: ConnectedFlight[] = [];

  constructor() {}
  ngAfterViewInit(): void {
    // console.log('this.selected flights=', this.flightInfoList);
  }

  ngOnInit(): void {
    // console.log('this.selected flights=', this.flightInfoList);
    // for (let flightInfo of this.flightInfoList) {
    //   console.log(' flight=', flightInfo);
    // }
  }

  selectFlight(index: number) {
    this.selectedList = index;
  }
}
