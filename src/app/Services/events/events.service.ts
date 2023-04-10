import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';
// === Services === //
import { SocketService } from 'src/app/Services/Server/socket.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { ExpressService } from 'src/app/Services/Server/express.service';
// === Services === //
// === Models ===== //
import { Events, FullEvents } from 'src/app/Model/events/events.model';
// === Models ===== //

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  // === Refresh Page === //
  refreshEvents$ = new Subject();
  // === Refresh Page === //
  constructor(
    private http: HttpClient,
    private socketServer: SocketService,
    private languageService: LanguageService,
    private expressService: ExpressService
  ) {}
  // === get all Events from V_Events DB === //
  /* === Used in Pages:
   * home
   * events
   */
  // === Get all Events from DB === //
  eventsGetAll(url: string, lang: string): Observable<Events[]> {
    return this.http
      .get<Events[]>(`${url}/events/view/${lang}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get all Events from DB === //
  // === Get Event from DB by ID For INFO Page === //
  /* === Used in Pages:
   * events
   */
  eventGet(url: string, lang: string, eventID: string): Observable<Events> {
    // const lang = this.languageService.langUse$.value;
    // console.log(lang);
    return this.http
      .get<Events>(`${url}/events/view/${lang}/${eventID}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get Event from DB by ID For INFO Page === //
  /* === Used in Pages:
   * Update event
   */
  // === Get Event from DB by ID === //
  eventUpdateID(url: string, eventID: string): Observable<Events> {
    return this.http
      .get<Events>(`${url}/events/Update/${eventID}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get Event from DB by ID === //
  //  === Update all items to Events DB === //
  EventsUpdate(url: string, ID: string, data: any): Observable<Events> {
    let link: string;
    if (ID !== null) {
      link = `${url}/events/Update/:${ID}`;
    } else {
      link = `${url}/events/Update/`;
    }
    return this.http
      .put<Events>(link, data)
      .pipe(catchError(this.expressService.handleError));
  }
  //  === Update all items to Events DB === //
}
