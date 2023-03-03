import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from './Services/Server/url.service';
import { SocialService } from './Services/cPanel/social.service';

// === Services === //
// === Models ===== //
import {
  MenuArray,
  defaultMenuArray,
  defaultMenuArraySettings,
} from './Model/Global/menu.model';
import { SocialMedia } from './Model/cPanel/social.model';
// === Models ===== //
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  dir$: string = 'ltr';
  // === SocialMedia === //
  social: SocialMedia[] = []; // === Get SocialMedia as ARRAY
  socialActive: SocialMedia[] = [];
  // === SocialMedia === //
  pageArray: MenuArray[] = defaultMenuArray;
  settings: MenuArray[] = defaultMenuArraySettings;

  constructor(
    private urlService: UrlService,
    private socialService: SocialService,
    private popoverCtrl: PopoverController,
    private routerURL: ActivatedRoute
  ) {}
  // === get all items from Social Media DB === //
  async allSocialMedia() {
    // this.socialActive = [];
    this.socialService
      .socialMediaGetAll(this.urlService.url)
      // .socialMediaGetAll(this.url)
      // .pipe(take(1))
      .subscribe((res) => {
        this.social = res;
        this.social.forEach((data: SocialMedia) => {
          if (data.active === true) {
            this.socialActive.push(data);
          }
        });
        // console.log('social', this.social);
        // console.log('socialActive', this.socialActive);
      });
  }
  // === get all items from Social Media DB === //
}
