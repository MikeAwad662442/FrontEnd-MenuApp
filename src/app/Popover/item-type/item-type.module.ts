import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { ItemTypePage } from './item-type.page';
import { ItemTypePageRoutingModule } from './item-type-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
// == plugins = //

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ItemTypePageRoutingModule,
    TranslateModule,
  ],
  declarations: [ItemTypePage],
})
export class ItemTypePageModule {}
