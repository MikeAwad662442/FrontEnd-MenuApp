import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NgxQrcodeStylingComponent, Options } from 'ngx-qrcode-styling';
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
  // === Config QR Options === //
  @ViewChild('wifiQR', { static: false })
  public wifiQR!: NgxQrcodeStylingComponent; // WIFI QR Update
  @ViewChild('serverQR', { static: false })
  public serverQR!: NgxQrcodeStylingComponent; // WIFI QR Update
  // === Stander Config Option === //
  // config: Options = {
  //   template: 'arabic',
  //   width: 250,
  //   height: 250,
  //   margin: 0,
  // };
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
  constructor(
    private urlService: UrlService,
    private qrService: QrService,
    private alertServer: AlertService,
    private actionSheetCtrl: ActionSheetController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getQR();
  }
  // === get WIFI Server && MENU Server && Facility image === //
  async getQR() {
    this.qrService.getQRdb(this.url);
    // === get Facility Info === /
    this.qrService.cFacilityGet$.subscribe((res: Facility[]) => {
      console.log('Facility ::', res);
      res.forEach((data: Facility) => {
        this.wifiImage$.next(`${this.imageURL} + ${data.image}`);
        this.wifiImage = this.imageURL + data.image;
      });
    });
    // === get Facility Info === //
    // === get WIFI Info ======= //
    this.qrService.cQR_Get$.subscribe(async (res: QR[]) => {
      console.log('cQR_Get ::', res);
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
        console.log('this.url ::', this.url);
        console.log('data.serverURL ::', data.serverURL);
        if (data.serverURL === this.url) {
          this.urlValue = this.url;
        } else {
          this.alertServer.showAlert('Alert.QRurlServer', '/cpanel/QR/QRadd');
        }
        // === Check if URL in DB === URL of Server === //
      });
    });
    // // === get WIFI Info ======= //
  }
  // === get WIFI Server && MENU Server && Facility image === //
  async radioGroupChange(event: any) {
    console.log(event);
  }
}
