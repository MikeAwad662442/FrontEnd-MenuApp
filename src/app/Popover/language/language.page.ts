import { Component, OnInit, inject } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
// === Services === //
// === Model ====== //
import { Language, defaultLanguage } from 'src/app/Model/cPanel/language.model';
// === Model === //
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  popoverCtrl = inject(PopoverController);
  languageService = inject(LanguageService);
  urlService = inject(UrlService);
  menu = inject(MenuController);
  langUS = '';
  langActive: Language[] = [];
  url: string = this.urlService.url;
  // constructor(
  //   private popoverCtrl: PopoverController,
  //   private languageService: LanguageService,
  //   private urlService: UrlService,
  //   private routerURL: ActivatedRoute
  // ) {}

  async ngOnInit() {
    await this.getLangActiveS();
    // console.log('URL:', this.url);
  }

  async getLangActiveS() {
    this.languageService.langActive(this.url).subscribe((res) => {
      // console.log('Popover Languages :', res.length);
      if (res.length === 0) {
        this.langActive = defaultLanguage;
        // console.log('langActive:', this.langActive);
      } else {
        this.langActive = res;
        // console.log('langActive:', this.langActive);
      }
    });
    this.langUS = this.languageService.langUse$.value;
    // console.log('langUS:', this.langUS);
  }
  langChange(event: Language) {
    // this.languageService.langStorageSetItem(event);
    this.languageService.saveLanguage(event.direction, event.id);
    this.popoverCtrl.dismiss();
    this.menu.close(); // to Close Menu
    // console.log('langChange langUS:', event);
  }
}
