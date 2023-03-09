import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// === Services === //
import { SocketService } from '../Server/socket.service';
import { ExpressService } from '../Server/express.service';
// === Services === //
// === Models ===== //
import { SocialMedia } from 'src/app/Model/cPanel/social.model';
// === Models ===== //
@Injectable({
  providedIn: 'root',
})
export class SocialService {
  socialMedia = new Subject<SocialMedia[]>();
  result = new Subject<SocialMedia[]>();
  constructor(
    private http: HttpClient,
    private socketServer: SocketService,
    private expressService: ExpressService
  ) {}
  // ================================================== //
  // ================================================== //
  // === EXPRESS.js == //
  // ================= //
  //  === get all items from SocialMedia DB === //
  socialMediaGetAll(url: string): Observable<SocialMedia[]> {
    // console.log('this.url:', url);
    return this.http
      .get<SocialMedia[]>(`${url}social`)
      .pipe(catchError(this.expressService.handleError));
  }
  //  === get all items from SocialMedia DB === //
  //  === Update all items to SocialMedia DB === //
  socialMediaUpdate(
    url: string,
    data: SocialMedia[]
  ): Observable<SocialMedia[]> {
    // console.log('this.url:', url);
    return this.http
      .put<SocialMedia[]>(`${url}social`, data)
      .pipe(catchError(this.expressService.handleError));
  }
  //  === Update all items to SocialMedia DB === //
  // ================= //
  // === EXPRESS.js == //
  // ================================================== //
  // ================================================== //
}
