import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { LanguagePage } from './language.page';
import { LanguagePageRoutingModule } from './language-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
// == plugins = //

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    IonicModule,
    LanguagePageRoutingModule,
    TranslateModule,
  ],
  declarations: [LanguagePage],
})
export class LanguagePageModule {}
