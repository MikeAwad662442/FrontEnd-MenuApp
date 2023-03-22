import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { EventsService } from 'src/app/Services/events/events.service';
import { ItemtypeService } from 'src/app/Services/items/itemtype.service';
// === Services === //
// === Models ===== //
import { Language } from 'src/app/Model/cPanel/language.model';
import { SocialService } from 'src/app/Services/cPanel/social.service';
import { Facility } from 'src/app/Model/cPanel/facility.model';
// === Models ===== //
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  newDB: boolean = false;
  imageSrc: string = './assets/icon/favicon.png';
  params = {
    appName: 'MENU app',
  };
  constructor(
    private urlService: UrlService,
    private routerURL: ActivatedRoute,
    private languageService: LanguageService,
    private socialService: SocialService,
    private itemTypeService: ItemtypeService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.firstIsFirst();
    // console.log(this.newDB);
  }
  firstIsFirst() {
    this.languageService.langGetAll(this.url).subscribe((res: Language[]) => {
      if (res.length !== 0) {
        this.newDB = true;
        this.socialService.getSocialMedia(this.urlService.url);
        this.socialService.Facility$.subscribe((res: Facility[]) => {
          res.forEach((data: Facility) => {
            this.imageSrc = data.image;
            this.params = {
              appName: data.name,
            };
          });
        });
      }
    });
  }
}
