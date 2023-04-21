import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./Global/home/home.module').then((m) => m.HomePageModule),
  },
  // === Item ===== //
  {
    path: 'Item',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Items/Item/all/all.module').then((m) => m.AllPageModule),
      },
      {
        path: ':ItemID',
        loadChildren: () =>
          import('./Items/Item/info/info.module').then((m) => m.InfoPageModule),
      },
      {
        path: 'update',
        loadChildren: () =>
          import('./Items/Item/update/update.module').then(
            (m) => m.UpdatePageModule
          ),
      },
      {
        path: 'update/:ItemID',
        loadChildren: () =>
          import('./Items/Item/update/update.module').then(
            (m) => m.UpdatePageModule
          ),
      },
      {
        path: 'orderList',
        loadChildren: () =>
          import('./Items/Item/order-list/order-list.module').then(
            (m) => m.OrderListPageModule
          ),
      },
    ],
  },
  // === Item ===== //
  // === ItemType = //
  {
    path: 'ItemType',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Items/ItemType/all/all.module').then(
            (m) => m.AllPageModule
          ),
      },

      {
        path: 'update',
        loadChildren: () =>
          import('./Items/ItemType/update/update.module').then(
            (m) => m.UpdatePageModule
          ),
      },
      {
        path: 'update/:ItemTypeID',
        loadChildren: () =>
          import('./Items/ItemType/update/update.module').then(
            (m) => m.UpdatePageModule
          ),
      },
      {
        path: 'info/:ItemTypeID',
        loadChildren: () =>
          import('./Items/ItemType/info/info.module').then(
            (m) => m.InfoPageModule
          ),
      },
      {
        path: 'orderList',
        loadChildren: () =>
          import('./Items/ItemType/order-list/order-list.module').then(
            (m) => m.OrderListPageModule
          ),
      },
    ],
  },
  // === ItemType = //
  // === Events === //
  {
    path: 'events',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Events/all/all.module').then((m) => m.AllPageModule),
      },
      {
        path: 'update',
        loadChildren: () =>
          import('./Events/update/update.module').then(
            (m) => m.UpdatePageModule
          ),
      },
      {
        path: 'update/:EventID',
        loadChildren: () =>
          import('./Events/update/update.module').then(
            (m) => m.UpdatePageModule
          ),
      },
      {
        path: 'info/:EventID',
        loadChildren: () =>
          import('./Events/info/info.module').then((m) => m.InfoPageModule),
      },
      {
        path: 'orderList',
        loadChildren: () =>
          import('./Events/order-list/order-list.module').then(
            (m) => m.OrderListPageModule
          ),
      },
    ],
  },
  // === Events === //
  // {
  //   path: 'language',
  //   loadChildren: () =>
  //     import('./Popover/language/language.module').then(
  //       (m) => m.LanguagePageModule
  //     ),
  // },
  {
    path: 'cpanel',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./Settings/cpanel/cpanel.module').then(
            (m) => m.CpanelPageModule
          ),
      },
      {
        path: 'language',
        loadChildren: () =>
          import('./Settings/language/language.module').then(
            (m) => m.LanguagePageModule
          ),
      },
      {
        path: 'social',
        loadChildren: () =>
          import('./Settings/social/social.module').then(
            (m) => m.SocialPageModule
          ),
      },
      {
        path: 'QR',
        children: [
          {
            path: 'QRadd',
            loadChildren: () =>
              import('./Settings/QR/add/add.module').then(
                (m) => m.AddPageModule
              ),
          },
          {
            path: 'QRprint',
            loadChildren: () =>
              import('./Settings/QR/print/print.module').then(
                (m) => m.PrintPageModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
