import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { CpanelPage } from './cpanel.page';
import { CpanelPageRoutingModule } from './cpanel-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
// == plugins = //
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CpanelPageRoutingModule,
    TranslateModule,
  ],
  declarations: [CpanelPage],
})
export class CpanelPageModule {}
