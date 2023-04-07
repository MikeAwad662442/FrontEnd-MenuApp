import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { AllPage } from './all.page';
import { AllPageRoutingModule } from './all-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
// == plugins = //

@NgModule({
  imports: [CommonModule, IonicModule, AllPageRoutingModule, TranslateModule],
  declarations: [AllPage],
})
export class AllPageModule {}
