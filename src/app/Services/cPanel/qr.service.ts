import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
// === Services === //
import { SocketService } from '../Server/socket.service';
import { ExpressService } from '../Server/express.service';
// === Services === //
// === Models ===== //
import { FullQR, QR } from 'src/app/Model/cPanel/qr.model';
import { Facility } from 'src/app/Model/cPanel/facility.model';

// === Models ===== //
@Injectable({
  providedIn: 'root',
})
export class QrService {
  cFacilityGet$ = new Subject<Facility>();
  cQR_Get$ = new Subject<QR>();
  constructor(
    private http: HttpClient,
    private socketServer: SocketService,
    private expressService: ExpressService
  ) {}
  getQRdb(url: string) {
    this.qrGetAll(url).subscribe((res: FullQR) => {
      this.cFacilityGet$.next(res.cFacilityGet);
      this.cQR_Get$.next(res.cQR_Get);
    });
  }

  // === get WIFI Server && MENU Server && Facility image === //
  qrGetAll(url: string): Observable<FullQR> {
    return this.http
      .get<FullQR>(`${url}qr`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === get WIFI Server && MENU Server && Facility image === //
}
