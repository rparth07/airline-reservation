import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor() {}

  getCurrentPageData<T>(
    selectedPageNumber: number,
    pageSize: number,
    apiData$: Observable<T[]>
  ) {
    const startIndex = selectedPageNumber * pageSize;
    const endIndex = selectedPageNumber * pageSize + pageSize;
    return apiData$.pipe(map((data) => data.slice(startIndex, endIndex)));
  }
}
