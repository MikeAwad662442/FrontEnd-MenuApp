import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NgxQrcodeStylingComponent,
  NgxQrcodeStylingService,
  Options,
} from 'ngx-qrcode-styling';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { QrService } from 'src/app/Services/cPanel/qr.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { SocialService } from 'src/app/Services/cPanel/social.service';
// === Services === //
// === Models ===== //
import { QR } from 'src/app/Model/cPanel/qr.model';
import { Facility } from 'src/app/Model/cPanel/facility.model';
import { BehaviorSubject, Subject } from 'rxjs';

// === Models ===== //
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  // === Config QR Options === //
  @ViewChild('wifiQR', { static: false })
  public wifiQR!: NgxQrcodeStylingComponent; // WIFI QR Update
  @ViewChild('serverQR', { static: false })
  public serverQR!: NgxQrcodeStylingComponent; // WIFI QR Update
  // === Stander Config Option === //
  config: Options = {
    template: 'arabic',
    width: 250,
    height: 250,
    margin: 0,
  };
  // === Config QR Options === //
  imageSrc: string = 'assets/icon/favicon.png'; // === default Image for QR
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === WIFI && SERVER === //
  wifiValue!: string; // === WIFI QR Code === //
  urlValue!: string; // === MENU Server QR Code === //
  wifiPassType = ['None', 'WEP', 'WPA', 'WPA2'];
  wifiImage!: string;
  // wifiImage$ = new BehaviorSubject<string>('');
  // === Form Group === //
  qrNetWork: FormGroup = this.fb.group({
    //   interface QR {
    //   QRwifi: {
    id: [null],
    wifiName: ['', [Validators.required, Validators.minLength(2)]],

    wifiPass: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(16)],
    ],
    wifiType: [null, [Validators.required]],
    wifiHidden: [null, [Validators.required]], // true/false    network SSID is hidden
    //   };
    //   QRserver: {
    serverURL: ['', [Validators.required]],
    //   };
  });
  // === Form Group === //
  // === WIFI && SERVER === //
  constructor(
    private fb: FormBuilder,
    // private routerURL: ActivatedRoute,
    private urlService: UrlService,
    private qrService: QrService,
    private socialService: SocialService,
    private alertServer: AlertService
  ) {}

  async ngOnInit() {
    await this.getQR();
  }
  // === get WIFI Server && MENU Server && Facility image === //
  async getQR() {
    this.qrNetWork.patchValue({
      serverURL: this.url,
    });
    // === get Facility Info === //
    this.qrService.getQRdb(this.url);
    this.qrService.cFacilityGet$.subscribe((res: Facility[]) => {
      res.forEach((data: Facility) => {
        this.wifiImage = this.imageURL + data.image;
        // this.wifiImage$.next(this.imageURL + data.image);
      });
      // console.log('this.wifiImage ::', this.wifiImage);
    });
    this.qrService.cQR_Get$.subscribe((res: QR[]) => {
      res.forEach((data: QR) => {
        this.qrNetWork.patchValue({
          id: data.id,
          wifiName: data.wifiName,
          wifiType: data.wifiType,
          wifiPass: data.wifiPass,
          wifiHidden: data.wifiHidden,
          serverURL: data.serverURL,
        });
        // console.log('cQR_Get ::', data);
      });
    });

    this.qrNetWork.valueChanges.subscribe((res) => this.onValueChanged(res));
    this.onValueChanged();
  }
  // === get WIFI Server && MENU Server && Facility image === //
  // === WIFI QR === //
  onValueChanged(data?: any) {
    // console.log('onValueChanged ::', data);
    this.wifiValue =
      'WIFI:S:' +
      this.qrNetWork.get('wifiName')?.value +
      ';T:' +
      this.qrNetWork.get('wifiType')?.value +
      ';P:' +
      this.qrNetWork.get('wifiPass')?.value +
      ';H:' +
      this.qrNetWork.get('wifiHidden')?.value +
      ';;';
    this.urlValue = this.qrNetWork.get('serverURL')?.value;
    console.log('this.wifiImage ::', this.wifiImage);
    // === add VALUE & IMAGE => QR === //
    /**
     * يجب أستخدام حلة التحديث لكي يأخذ المعطيات
     */
    if (data !== undefined) {
      this.wifiQR.update(this.config, {
        data: this.wifiValue,
        image: this.wifiImage,
      });
      this.serverQR.update(this.config, {
        data: this.urlValue,
        image: this.imageSrc,
      });
    }
    // === add VALUE & IMAGE => QR === //
  }
  // === Save Data To WIFI & PC Serve === //
  submitForm() {
    /**
     * there is no Image For that cannot use new FormData()
     */
    const newForm = this.qrNetWork.value;
    console.log('newForm ::', newForm);
    this.qrService.qrUpdate(this.url, newForm).subscribe((res: any) => {
      console.log('IF everything work well', res);
    });
  }
}
