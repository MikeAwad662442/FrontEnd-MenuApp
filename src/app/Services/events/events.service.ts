import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, tap } from 'rxjs';
// === Services === //
import { SocketService } from 'src/app/Services/Server/socket.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { ExpressService } from 'src/app/Services/Server/express.service';
// === Services === //
// === Models ===== //
import { Events } from 'src/app/Model/events/events.model';
// === Models ===== //

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private events$ = new Subject<Events[]>();
  constructor(
    private http: HttpClient,
    private socketServer: SocketService,
    private languageService: LanguageService,
    private expressService: ExpressService
  ) {}
  // ========================= //
  // === Global Function ===== //
  // ========================= //
  // === get all Events from V_Events DB === //
  /* === Used in Pages:
   * home
   * events
   */
  async getEvents(url: string) {
    this.eventsGetAll(url).subscribe((res: Events[]) => {
      this.events$.next(res);
    });
  }
  // === Get all Events from DB === //
  eventsGetAll(url: string): Observable<Events[]> {
    const lang = this.languageService.langUse$.value;
    console.log(lang);
    return (
      this.http
        // .get<Events[]>(`${url}events/`, { params })
        .get<Events[]>(`${url}/events/${lang}`)
        .pipe(catchError(this.expressService.handleError))
    );
  }
  // === Get all Events from DB === //
  //  === Update all items to Events DB === //
  EventsUpdate(url: string, data: any): Observable<Events> {
    // console.log('this.url:', url);
    return this.http
      .put<Events>(`${url}/events/`, data)
      .pipe(catchError(this.expressService.handleError));
  }
  //  === Update all items to Events DB === //
  // ========================= //
  // === Global Function ===== //
  // ========================= //
}
