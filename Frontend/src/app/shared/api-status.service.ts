import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiStatusService {
  message = '';
  failedRequest: string | null = null;
}
