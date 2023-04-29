import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
// === Services === //
import { ExpressService } from '../Server/express.service';
import { SocketService } from '../Server/socket.service';
// === Services === //
/** there is no Models in CRUD Service because I make it Global **/
@Injectable({
  providedIn: 'root',
})
export class CRUDService {
  // *** New way us inject not constructor *** //
  http = inject(HttpClient);
  socketServer = inject(SocketService);
  expressService = inject(ExpressService);
  // *** New way us inject not constructor *** //
  // === Refresh Page === //
  RefreshGlobal$ = new Subject();
  // === Refresh Page === //

  // constructor() {}
  // === get all any from V_any DB === //
  /* === Used in Pages:
   * home
   * any all
   * any Info
   */
  // === Get all any from DB === //
  GetAll(url: string, lang: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${url}/${lang}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get all any from DB === //
  // === Get Event from DB by ID For INFO Page === //
  /* === Used in Pages:
   * any Info
   */
  GetID(url: string, lang: string, GlobalID: string): Observable<any> {
    // const lang = this.languageService.langUse$.value;
    // console.log(lang);
    return this.http
      .get<any>(`${url}/${lang}/${GlobalID}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get Event from DB by ID For INFO Page === //
  /* === Used in Pages:
   * Update event
   */
  // === Get Event from DB by ID === //
  UpdateGetID(url: string, GlobalID: string): Observable<any> {
    return this.http
      .get<any>(`${url}/${GlobalID}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get Event from DB by ID === //
  // === Update any DB === //
  Update(url: string, GlobalID: string, data: any): Observable<any> {
    let link: string;
    if (GlobalID !== null) {
      link = `${url}/${GlobalID}`;
    } else {
      link = `${url}`;
    }
    // console.log(link);
    return this.http
      .put<any>(link, data)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Update any DB === //
  // === Delete any DB === //
  Delete(url: string, GlobalID?: string): Observable<any> {
    // console.log('Event ID ::', ID);
    let link: string;
    if (GlobalID !== undefined) {
      link = `${url}/${GlobalID}`;
    } else {
      link = `${url}`;
    }
    console.log(link);
    return this.http
      .delete<any>(link)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Delete any DB === //
  // === Update Order List === //
  OrderList(url: string, data: any[]): Observable<any> {
    return this.http
      .put<any>(`${url}`, data)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Update Order List === //
}
