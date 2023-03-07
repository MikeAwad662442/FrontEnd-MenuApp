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
  private events = new Subject<Events[]>();
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
  // eventsGetAll(url: string, lang: string): Observable<Events[]> {
  //   let params = new HttpParams();
  //   params = params.append('lang', lang);
  //   return (
  //     this.http
  //       // .get<Events[]>(`${url}events/`, { params })
  //       .get<Events[]>(`${url}events/?lang=${lang}`)
  //       // ==== Get nay New DATA ===== //
  //       .pipe(
  //         tap(() => {
  //           this.events.next();
  //         }),
  //         catchError(this.expressService.handleError)
  //       )
  //     // ==== Get nay New DATA ===== //
  //   );
  // }
  // ========================= //
  // === Global Function ===== //
  // ========================= //
}
