import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ExpressService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  httpUrlencoded = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };
  constructor() {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Error: `, error.error.message);
    } else {
      console.error(
        `Error From Server: `,
        error.status,
        '\t and Error: ',
        error.error
      );
    }
    return throwError('Server Error');
  }
}
