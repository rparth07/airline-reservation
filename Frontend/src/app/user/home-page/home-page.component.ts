import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataStorageService } from '../shared/services/data-storage.service';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  loading = false;
  airportsReady = false;
  airportError = false;
  private destroyed = new Subject<void>();
  isMulticity: boolean = false;
  isOneWay: boolean = true;

  constructor(
    private searchService: SearchService,
    private dataStorage: DataStorageService
  ) {}

  ngOnInit(): void {
    this.searchService.changeTrip.pipe(takeUntil(this.destroyed)).subscribe((isOneWay) => {
      this.isOneWay = isOneWay;
    });
    this.loadAirports();
  }

  loadAirports() {
    if (this.loading) return;
    this.loading = true;
    this.airportError = false;
    this.dataStorage.fetchAirports().pipe(takeUntil(this.destroyed)).subscribe({
      next: (airports) => {
        this.searchService.setCityList(airports);
        this.airportsReady = true;
        this.loading = false;
      },
      error: () => {
        this.airportError = true;
        this.loading = false;
      },
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
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
