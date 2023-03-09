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
  constructor(
    private urlService: UrlService,
    private languageService: LanguageService,
    private socialService: SocialService
  ) {}

  ngOnInit() {}
  async allLanguage() {
    this.languageService
      .langGetAll(this.url)
      .subscribe((res: Language[]) => {});
  }
}
