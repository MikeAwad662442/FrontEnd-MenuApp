import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { PrintPage } from './print.page';
import { PrintPageRoutingModule } from './print-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
// == plugins = //
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PrintPageRoutingModule,
    TranslateModule,
    NgxQrcodeStylingModule,
  ],
  declarations: [PrintPage],
})
export class PrintPageModule {}
