import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// === Page === //
import { OrderListPage } from './order-list.page';
import { OrderListPageRoutingModule } from './order-list-routing.module';
// === Page === //
// == plugins = //
import { TranslateModule } from '@ngx-translate/core';
// == plugins = //

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OrderListPageRoutingModule,
    TranslateModule,
  ],
  declarations: [OrderListPage],
})
export class OrderListPageModule {}
