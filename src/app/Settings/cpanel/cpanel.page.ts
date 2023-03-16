import { Component, OnInit } from '@angular/core';

// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { SocialService } from 'src/app/Services/cPanel/social.service';
// === Services === //
// === Models ===== //
import { Language } from 'src/app/Model/cPanel/language.model';
import { SocialMedia } from 'src/app/Model/cPanel/social.model';
// === Models ===== //
@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.page.html',
  styleUrls: ['./cpanel.page.scss'],
})
export class CpanelPage implements OnInit {
  url: string = this.urlService.url;
  // === Language === //
  language!: Language[]; // === Get Language as ARRAY
  languageActive!: Language[];
  languageDefault!: string;
  // === Language === //
  // === SocialMedia === //
  social!: SocialMedia[]; // === Get SocialMedia as ARRAY
  socialActive!: SocialMedia[];
  // === SocialMedia === //
  constructor(
    private urlService: UrlService,
    private languageService: LanguageService,
    private socialService: SocialService
  ) {}

  async ngOnInit() {
    await this.allLanguage();
    await this.allSocialMedia();
  }
  // === get all items from Languages DB === //
  async allLanguage() {
    this.languageActive = [];
    this.languageService
      .langGetAll(this.url)
      // .pipe(take(1))
      .subscribe((res) => {
        this.language = res;
        this.language.forEach((data: Language) => {
          if (data.active === true) {
            this.languageActive.push(data);
          }
          if (data.default === true) {
            this.languageDefault = data.name;
          }
        });
        // console.log('language', this.language);
      });
  }
  // === get all items from Languages DB === //
  // === get all items from Social Media DB === //
  async allSocialMedia() {
    this.socialActive = [];
    this.socialService.getSocialMedia(this.urlService.url);
    this.socialService.socialMedia.subscribe((res) => {
      this.social = res;
      this.social.forEach((data: SocialMedia) => {
        if (data.active === true) {
          this.socialActive.push(data);
        }
      });
    });
  }
  // === get all items from Social Media DB === //
}
