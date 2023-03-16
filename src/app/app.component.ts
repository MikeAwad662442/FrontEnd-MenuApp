import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { SocketService } from 'src/app/Services/Server/socket.service';
import { SocialService } from 'src/app/Services/cPanel/social.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
// === Services === //
// === Models ===== //
import {
  MenuArray,
  defaultMenuArray,
  defaultMenuArraySettings,
} from 'src/app/Model/Global/menu.model';
import { SocialMedia } from 'src/app/Model/cPanel/social.model';
import { LanguagePage } from 'src/app/Popover/language/language.page';
// === Models ===== //
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  url!: string;
  dir$ = new BehaviorSubject<string>('rtl');
  menuDir$ = new BehaviorSubject<string>('start');
  connectServer$ = new BehaviorSubject<boolean>(false);
  // === SocialMedia === //
  // social;
  socialActive = new BehaviorSubject<SocialMedia[]>([]);
  // socialActive: Observable<SocialMedia[]>;

  // socialActive: SocialMedia[] = [];
  // === SocialMedia === //
  pageArray: MenuArray[] = defaultMenuArray;
  settings: MenuArray[] = defaultMenuArraySettings;

  constructor(
    private urlService: UrlService,
    public socketService: SocketService, // It must to be PUBLIC to work in html Page
    private languageService: LanguageService,
    private socialService: SocialService,
    private popoverCtrl: PopoverController,
    private routerURL: ActivatedRoute
  ) {
    this.socketService.setupSocketConnection().then(() => {
      this.url = this.urlService.url;
      this.languageService.appLang(this.url);
      this.direction();
      this.allSocialMedia();
      // console.log('First Page URL : ', this.url);
    });
  }
  /**
   * Get Direction to APP from BehaviorSubject {{direction$}} in Language Server
   * the direction influence on ion-app tag to decorate the APP style RTL || LTR
   */
  async direction() {
    this.languageService.direction$.subscribe((res) => {
      this.dir$.next(res);
      // console.log('New Direction To the APP', this.dir$.getValue());
      /**  menuDir$ not work as i hoop for that i stop used for now in html tag */
      if (res === 'rtl') {
        this.menuDir$.next('end');
        // console.log('MENU Direction', this.menuDir$.getValue());
      } else {
        this.menuDir$.next('start');
        // console.log('MENU Direction', this.menuDir$.getValue());
      }
    });
    this.socketService.connectServer$.subscribe((res) => {
      this.connectServer$.next(res);
      // this.connectServer$.value
    });
  }
  // === Get Direction to APP from BehaviorSubject {{direction$}} from Language Server === //
  // === get all items from Social Media DB === //
  async allSocialMedia() {
    this.socialService.getSocialMedia(this.urlService.url);
    this.socialService.socialMedia.subscribe((res) => {
      let social: SocialMedia[] = [];
      res.forEach((data: SocialMedia) => {
        if (data.active === true) {
          social.push(data);
        }
      });
      this.socialActive.next(social);
      // console.log(res);
    });
  }
  // === get all items from Social Media DB === //

  async langPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: LanguagePage,
      event: ev,
    });
    await popover.present();
    // console.log('langPopover:', ev.detail.value);
  }
}
