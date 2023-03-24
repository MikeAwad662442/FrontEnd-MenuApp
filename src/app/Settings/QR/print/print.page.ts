import { Component, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxQrcodeStylingComponent, Options } from 'ngx-qrcode-styling';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { QrService } from 'src/app/Services/cPanel/qr.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
// === Services === //
// === Models ===== //
import { QR } from 'src/app/Model/cPanel/qr.model';
import { Facility } from 'src/app/Model/cPanel/facility.model';
import { Subject } from 'rxjs';
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
  FullWifi: string[] = []
  wifiValue!: string; // === WIFI QR Code === //
  urlValue!: string; // === MENU Server QR Code === //
  wifiImage!: string;
  // === WIFI && SERVER === //
  constructor(
    private urlService: UrlService,
    private qrService: QrService,
    private alertServer: AlertService
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
      res.forEach((data: QR) => {
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
      });
    });
    // // === get WIFI Info ======= //
    this.urlValue = this.url;
  }
  // async QRviwe() {
  //   console.log('cQR_Get 1::', this.wifiValue);
  //   console.log('this.wifiImage 1::', this.wifiImage);
  //   if (this.wifiValue !== undefined) {
  //     console.log('cQR_Get 2 ::', this.wifiValue);
  //     console.log('this.wifiImage 2 ::', this.wifiImage);
  //     this.wifiQR.update(this.config, {
  //       data: this.wifiValue,
  //       image: this.wifiImage,
  //     });
  //     this.serverQR.update(this.config, {
  //       data: this.urlValue,
  //       image: this.imageSrc,
  //     });
  //   }
  // }
  // async QRviwe(
  //   wifiValue: string,
  //   wifiImage: string,
  //   urlValue: string,
  //   imageSrc: string
  // ) {
  //   console.log('cQR_Get 1::', this.wifiValue);
  //   console.log('this.wifiImage 1::', this.wifiImage);
  //   if (this.wifiValue !== undefined) {
  //     console.log('cQR_Get 2 ::', wifiValue);
  //     console.log('this.wifiImage 2 ::', wifiImage);
  //     this.wifiQR.update(this.config, {
  //       data: wifiValue,
  //       image: wifiImage,
  //     });
  //     this.serverQR.update(this.config, {
  //       data: urlValue,
  //       image: imageSrc,
  //     });
  //   }
  // }

  // === get WIFI Server && MENU Server && Facility image === //
}
