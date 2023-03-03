import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
// == plugins = //
@NgModule({
  imports: [CommonModule, IonicModule, HomePageRoutingModule, TranslateModule],
  declarations: [HomePage],
})
export class HomePageModule {}
