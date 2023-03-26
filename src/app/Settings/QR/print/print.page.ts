import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { QrService } from 'src/app/Services/cPanel/qr.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
// === Services === //
// === Models ===== //
import { QR } from 'src/app/Model/cPanel/qr.model';
import { Facility } from 'src/app/Model/cPanel/facility.model';

// === Models ===== //

@Component({
  selector: 'app-print',
  templateUrl: './print.page.html',
  styleUrls: ['./print.page.scss'],
})
export class PrintPage implements OnInit {
  // PrintBody
  @ViewChild('#PrintBody', { static: false })
  public PrintBody!: ElementRef;
  // === Config QR Options === //
  imageSrc: string = 'assets/icon/favicon.png'; // === default Image for QR
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === WIFI && SERVER === //
  wifiImage$ = new Subject<string>();
  FullWifi!: QR[];
  wifiValue!: string; // === WIFI QR Code === //
  urlValue!: string; // === MENU Server QR Code === //
  wifiImage!: string;
  // === WIFI && SERVER === //
  PagePrint: string = '8cm'; // === Page Default Value === //

  constructor(
    private urlService: UrlService,
    private qrService: QrService,
    private alertServer: AlertService
  ) {}

  async ngOnInit() {
    await this.getQR();
  }
  // === get WIFI Server && MENU Server && Facility image === //
  async getQR() {
    await this.qrService.getQRdb(this.url);

    // === get Facility Info === /
    this.qrService.cFacilityGet$.subscribe(async (res: Facility[]) => {
      // console.log('Facility ::', res);
      res.forEach(async (data: Facility) => {
        this.wifiImage$.next(`${this.imageURL}${data.image}`);
        this.wifiImage = this.imageURL + data.image;
      });
    });
    // === get Facility Info === //
    // === get WIFI Info ======= //
    this.qrService.cQR_Get$.subscribe(async (res: QR[]) => {
      // console.log('cQR_Get ::', res);
      this.FullWifi = res;
      this.FullWifi.forEach((data: QR) => {
        this.wifiValue =
          'WIFI:S:' +
          data.wifiName +
          ';T:' +
          data.wifiType +
          ';P:' +
          data.wifiPass +
          ';H:' +
          data.wifiHidden +
          ';;';
        // === Check if URL in DB === URL of Server === //
        // console.log('this.url ::', this.url);
        // console.log('data.serverURL ::', data.serverURL);
        if (data.serverURL === this.url) {
          this.urlValue = this.url;
        } else {
          this.alertServer.showAlert('Alert.QRurlServer', '/cpanel/QR/QRadd');
        }
        // === Check if URL in DB === URL of Server === //
      });
    });
    // === get WIFI Info ======= //
  }
  // === get WIFI Server && MENU Server && Facility image === //
  async radioGroupChange(event: any) {
    /**
     * Get Page Type the print on init
     */
    this.PagePrint = event.detail.value;
  }
  async print() {
    window.print();
    console.log(this.PagePrint);
  }
}
