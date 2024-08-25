import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  isMulticity: boolean = false;
  isOneWay: boolean = true;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchService.changeTrip.subscribe((isOneWay) => {
      this.isOneWay = isOneWay;
    });
    this.searchService.setCityList(this.route.snapshot.data['airportNames']);
  }

  changeToOneWay() {
    this.isOneWay = true;
    this.isMulticity = false;
  }

  changeToRoundTrip() {
    this.isOneWay = false;
    this.isMulticity = false;
  }

  changeToMulticity() {
    this.isOneWay = false;
    this.isMulticity = true;
  }
}
