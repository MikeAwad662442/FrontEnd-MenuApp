import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { UpdatePage } from './update.page';
import { UpdatePageRoutingModule } from './update-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //  Insert FORMS
import { QuillModule } from 'ngx-quill';
// == plugins = //

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    UpdatePageRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
  ],
  declarations: [UpdatePage],
})
export class UpdatePageModule {}
