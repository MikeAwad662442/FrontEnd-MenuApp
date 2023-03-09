import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { LanguagePage } from './language.page';
import { LanguagePageRoutingModule } from './language-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //  Insert FORMS
// == plugins = //
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LanguagePageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LanguagePage],
})
export class LanguagePageModule {}
