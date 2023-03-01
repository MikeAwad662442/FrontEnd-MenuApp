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
  {
    path: 'all',
    loadChildren: () => import('./Items/Item/all/all.module').then( m => m.AllPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./Items/Item/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./Items/Item/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'all',
    loadChildren: () => import('./Items/ItemType/all/all.module').then( m => m.AllPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./Items/ItemType/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./Items/ItemType/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'all',
    loadChildren: () => import('./Events/all/all.module').then( m => m.AllPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./Events/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'update',
    loadChildren: () => import('./Events/update/update.module').then( m => m.UpdatePageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./Popover/language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'cpanel',
    loadChildren: () => import('./Settings/cpanel/cpanel.module').then( m => m.CpanelPageModule)
  },
  {
    path: 'language',
    loadChildren: () => import('./Settings/language/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'social',
    loadChildren: () => import('./Settings/social/social.module').then( m => m.SocialPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
