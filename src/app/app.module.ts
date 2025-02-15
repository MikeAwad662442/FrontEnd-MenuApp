import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// === HTTP SERVER === //
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from '@angular/common/http';
// import { TokenInService } from './services/token-in.service';
// === HTTP SERVER === //
// == NGX Translate == //
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// == NGX Translate == //
// == Add Popovers === //
import { LanguagePageModule } from './Popover/language/language.module';
import { ItemTypePageModule } from './Popover/item-type/item-type.module';
// == Add Popovers === //
// == TEXT Editor ==== //
import { QuillModule } from 'ngx-quill';

// == TEXT Editor ==== //
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    // == NGX Translate == //
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: languageLoader,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    // == NGX Translate == //
    // == Add Popovers === //
    LanguagePageModule,
    ItemTypePageModule,
    // == Add Popovers === //
    // == TEXT Editor ==== //
    QuillModule.forRoot(),
    // == TEXT Editor ==== //
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
// == NGX Translate == //
export function languageLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
// == NGX Translate == //
