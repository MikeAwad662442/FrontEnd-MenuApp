import { Facility } from 'src/app/Model/cPanel/facility.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// === Services === //
import { SocketService } from '../Server/socket.service';
import { ExpressService } from '../Server/express.service';
// === Services === //
// === Models ===== //
import {
  FullSocialMedia,
  SocialMedia,
} from 'src/app/Model/cPanel/social.model';
// === Models ===== //
@Injectable({
  providedIn: 'root',
})
export class SocialService {
  socialMedia = new Subject<SocialMedia[]>();
  Facility = new Subject<Facility>();
  // result = new Subject<SocialMedia[]>();
  constructor(
    private http: HttpClient,
    private socketServer: SocketService,
    private expressService: ExpressService
  ) {}
  // ================================================== //
  // ================================================== //
  // === EXPRESS.js == //
  // ================= //
  getSocialMedia(url: string) {
    this.socialMediaGetAll(url).subscribe((res: FullSocialMedia) => {
      this.socialMedia.next(res.cSocialGet);
      this.Facility.next(res.cFacilityGet);
    });
  }
  //  === get all items from SocialMedia DB === //
  socialMediaGetAll(url: string): Observable<FullSocialMedia> {
    // console.log('this.url:', url);
    return this.http
      .get<FullSocialMedia>(`${url}social`)
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
