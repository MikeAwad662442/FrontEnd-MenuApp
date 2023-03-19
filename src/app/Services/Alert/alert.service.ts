import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private translate: TranslateService
  ) {}
  // === If Uploaded === //
  async showAlert(mes: string, url: string) {
    const alert = await this.alertCtrl.create({
      header: 'MENU',
      message: this.translate.instant(mes),
    });
    alert.present();
    setTimeout(() => {
      alert.dismiss();
      this.router.navigate([url]);
    }, 3000);
  }
  // === If Uploaded === //
  // === error in Insert image === //
  async errorAlertIMG(mes: string) {
    const alert = await this.alertCtrl.create({
      header: 'MENU',
      message: this.translate.instant(mes),
    });
    alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 2000);
  }
  // === error in Insert image === //
}
