import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemTypePage } from './item-type.page';

const routes: Routes = [
  {
    path: '',
    component: ItemTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemTypePageRoutingModule {}
