import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { SocialPage } from './social.page';
import { SocialPageRoutingModule } from './social-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //  Insert FORMS
// == plugins = //
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SocialPageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [SocialPage],
})
export class SocialPageModule {}
