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
    return apiData$.pipe(map((data) => data.slice(Math.min(startIndex, Math.max(0, Math.ceil(data.length / pageSize) - 1) * pageSize), Math.min(startIndex, Math.max(0, Math.ceil(data.length / pageSize) - 1) * pageSize) + pageSize)));
  }
}
