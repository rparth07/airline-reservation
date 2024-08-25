import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Cities } from '../interfaces/trip-cities';
import { DataStorageService } from '../services/data-storage.service';

@Injectable()
export class AirportNameResolve implements Resolve<Cities[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Cities[] | Observable<Cities[]> | Promise<Cities[]> {
    return this.dataStorageService.fetchAirports();
  }
}
