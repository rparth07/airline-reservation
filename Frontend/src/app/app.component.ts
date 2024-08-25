import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cities } from './shared/interfaces/trip-cities';
import { DataStorageService } from './shared/services/data-storage.service';
import { SearchService } from './shared/services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'airline-reservation';
  airportNames!: Cities[];
  constructor(
    private searchService: SearchService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute
  ) {
    this.dataStorageService.fetchAirports();
    // this.searchService.setCityList(this.route.snapshot.data['airportName']);
    // console.log(this.route.snapshot.data);
  }
}
