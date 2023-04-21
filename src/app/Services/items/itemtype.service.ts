import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError } from 'rxjs';
// === Services === //
import { SocketService } from 'src/app/Services/Server/socket.service';
import { ExpressService } from 'src/app/Services/Server/express.service';
// === Services === //
// === Models ===== //
import { ItemTypes } from 'src/app/Model/items/items.model';
// === Models ===== //
@Injectable({
  providedIn: 'root',
})
export class ItemtypeService {
  // === Refresh Page === //
  RefreshItemTypes$ = new Subject();
  // === Refresh Page === //
  constructor(
    private http: HttpClient,
    private socketServer: SocketService,
    private expressService: ExpressService
  ) {}
  // === get all ItemTypes from V_ItemTypes DB === //
  /* === Used in Pages:
   * home
   * ItemTypes all
   * ItemTypes Info
   */
  // === Get all ItemTypes from DB === //
  ItemTypesGetAll(url: string, lang: string): Observable<ItemTypes[]> {
    return this.http
      .get<ItemTypes[]>(`${url}/ItemTypes/view/${lang}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get all ItemTypes from DB === //
  // === Get ItemType from DB by ID For INFO Page === //
  /* === Used in Pages:
   * ItemTypes Info
   */
  ItemTypeGet(
    url: string,
    lang: string,
    ItemTypeID: string
  ): Observable<ItemTypes> {
    // const lang = this.languageService.langUse$.value;
    // console.log(lang);
    return this.http
      .get<ItemTypes>(`${url}/ItemType/view/${lang}/${ItemTypeID}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get ItemType from DB by ID For INFO Page === //
  /* === Used in Pages:
   * Update ItemType
   */
  // === Get ItemType from DB by ID === //
  EItemTypesUpdateID(url: string, eventID: string): Observable<ItemTypes> {
    return this.http
      .get<ItemTypes>(`${url}/events/Update/${eventID}`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Get Event from DB by ID === //
  // === Update Events DB === //
  EventsUpdate(url: string, ID: string, data: any): Observable<ItemTypes> {
    let link: string;
    if (ID !== null) {
      link = `${url}/events/Update/${ID}`;
    } else {
      link = `${url}/events/Update/`;
    }
    return this.http
      .put<ItemTypes>(link, data)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Update ItemTypes DB === //
  // === Delete ItemTypes DB === //
  ItemTypesDelete(url: string, ID?: string): Observable<any> {
    // console.log('Event ID ::', ID);
    let link: string;
    if (ID !== undefined) {
      link = `${url}/events/Update/${ID}`;
    } else {
      link = `${url}/events/Update/`;
    }
    return this.http
      .delete<any>(link)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Delete ItemTypes DB === //
  // === Update Order List === //
  ItemTypesOrderList(url: string, data: any[]): Observable<any> {
    return this.http
      .put<any>(`${url}/events/OrderList`, data)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Update Order List === //
}
