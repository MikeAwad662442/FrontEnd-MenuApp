import { Component, OnInit, inject } from '@angular/core';
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
import { CRUDService } from 'src/app/Services/Global/crud.service';
import { ItemTypes } from 'src/app/Model/items/items.model';
import { Events } from 'src/app/Model/events/events.model';
// === Models ===== //
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  CRUDService = inject(CRUDService);
  urlService = inject(UrlService);
  languageService = inject(LanguageService);
  socialService = inject(SocialService);
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === URL For CRUDService === //
  EventsGetAllURL: string = `${this.url}/events/view`;
  ItemTypesGetAllURL: string = `${this.url}/ItemTypes/view`;
  // === URL For CRUDService === //
  eventsAll!: Events[]; // === Events === //
  ItemTypesAll!: ItemTypes[]; // === ItemTypes === //
  newDB: boolean = false;
  imageSrc: string = './assets/icon/favicon.png';
  params = {
    appName: 'MENU app',
  };
  // constructor(
  //   private urlService: UrlService,

  //   private languageService: LanguageService,
  //   private socialService: SocialService,
  //   private itemTypeService: ItemtypeService,
  //   private eventsService: EventsService
  // ) {}

  ngOnInit() {
    this.firstIsFirst();
    // console.log(this.newDB);
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      this.CRUDService.RefreshGlobal$.subscribe(() => {
        // === Get All ItemTypes from Server === //
        this.CRUDService.GetAll(this.ItemTypesGetAllURL, lang).subscribe(
          (res: ItemTypes[]) => {
            if (res.length > 0) {
              this.ItemTypesAll = res;
            }
          }
        );
        // === Get All ItemTypes from Server === //
        // === Get All Events from Server === //
        this.CRUDService.GetAll(this.EventsGetAllURL, lang).subscribe(
          (res: Events[]) => {
            if (res.length > 0) {
              this.eventsAll = res;
            }
          }
        );
        // === Get All Events from Server === //
      });
      // === Get All ItemTypes from Server === //
      this.CRUDService.GetAll(this.ItemTypesGetAllURL, lang).subscribe(
        (res: ItemTypes[]) => {
          if (res.length > 0) {
            this.ItemTypesAll = res;
          }
        }
      );
      // === Get All ItemTypes from Server === //
      // === Get All Events from Server === //
      this.CRUDService.GetAll(this.EventsGetAllURL, lang).subscribe(
        (res: Events[]) => {
          if (res.length > 0) {
            this.eventsAll = res;
          }
        }
      );
      // === Get All Events from Server === //
    });
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
