import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { AddPage } from './add.page';
import { AddPageRoutingModule } from './add-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //  Insert FORMS
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
// == plugins = //

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgxQrcodeStylingModule,
  ],
  declarations: [AddPage],
})
export class AddPageModule {}
