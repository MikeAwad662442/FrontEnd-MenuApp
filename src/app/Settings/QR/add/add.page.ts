import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { QrService } from 'src/app/Services/cPanel/qr.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';

// === Services === //
// === Models ===== //
import { FullQR, QR } from 'src/app/Model/cPanel/qr.model';
import { Facility } from 'src/app/Model/cPanel/facility.model';
// === Models ===== //
@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  url: string = this.urlService.url;
  wifiValue!: string; // === WIFI QR Code === //
  urlValue!: string; // === MENU Server QR Code === //
  wifiPassType = ['None', 'WEP', 'WPA', 'WPA2'];
  // === Form Group === //
  qrNetWork: FormGroup = this.fb.group({
    //   interface QR {
    //   QRwifi: {
    wifiName: ['', [Validators.required, Validators.minLength(2)]],
    wifiImage: ['', [Validators.required]],
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
  // === to get Filses Info === //
  imageSrc: any;
  fileType!: string;
  file!: File;
  // === to get Filses Info === //
  constructor(
    private fb: FormBuilder,
    // private routerURL: ActivatedRoute,
    private urlService: UrlService,
    private qrService: QrService,
    private alertServer: AlertService
  ) {}

  async ngOnInit() {
    this.qrService.getQRdb(this.url);
    await this.getQR();
    await this.createForm();
  }
  async createForm() {
    this.qrNetWork;
    this.qrNetWork.valueChanges.subscribe((res) => this.onValueChanged(res));
    this.onValueChanged();
  }
  // === get WIFI Server && MENU Server && Facility image === //
  async getQR() {
    // this.qrService.qrGetAll(this.url);
    this.qrService.cFacilityGet$.subscribe((res: Facility) => {
      console.log('cFacilityGet ;', res);
    });
    this.qrService.cQR_Get$.subscribe((res: QR) => {
      console.log('cQR_Get :', res);
    });
  }
  // === get WIFI Server && MENU Server && Facility image === //
  // === Get / Images || Videos / From UpLodFile === //
  async onFileChange(event: any) {
    // this.file = (event.target as HTMLInputElement).files[0];
    this.file = event.target.files[0];
    const reader = new FileReader();

    if (this.file) {
      reader.readAsDataURL(this.file);
      if (this.file.type.indexOf('image') > -1) {
        this.fileType = 'image';
      } else if (this.file.type.indexOf('video') > -1) {
        this.fileType = 'video';
      }
      reader.onload = (e) => (this.imageSrc = reader.result);
    }

    this.qrNetWork.patchValue({
      wifiImage: this.file,
    });
  }
  // === Get / Images || Videos / From UpLodFile === //
  // === WIFI QR === //
  onValueChanged(data?: any) {
    // if (!this.qrNetWork) {
    //   return;
    // }
    // const form = this.qrNetWork;
    // for (let field in this.formErrors) {
    //   if (this.formErrors.hasOwnProperty(field)) {
    //     this.formErrors?[field] = '';
    //     const control = form.get(field);
    //     if (control && control.dirty && !control.valid) {
    //       const messages = this.validationMessages?[field];
    //       for (const key in control.errors) {
    //         if (control.errors.hasOwnProperty(key)) {
    //           this.formErrors?[field] += messages[key] + ' ';
    //         }
    //       }
    //     }
    //   }
    // }
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
  }
  // === Save Data To WIFI & PC Serve === //
  submitForm() {}
}
