import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { InfoPage } from './info.page';
import { InfoPageRoutingModule } from './info-routing.module';
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
import { QuillModule } from 'ngx-quill';
// == plugins = //

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    InfoPageRoutingModule,
    TranslateModule,
    QuillModule,
  ],
  declarations: [InfoPage],
})
export class InfoPageModule {}
