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
  lang!: string;
  params = {
    appName: 'MENU app',
  };
  async ngOnInit() {
    this.firstIsFirst();
    // console.log(this.newDB);
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe(async (res) => {
      this.lang = res;
      await this.GetALL();
    });
    this.CRUDService.RefreshGlobal$.subscribe(async () => {
      await this.GetALL();
    });
    await this.GetALL();
  }
  // === repeat Get All === //
  async GetALL() {
    // === Get All ItemTypes from Server === //
    this.CRUDService.GetAll(this.ItemTypesGetAllURL, this.lang).subscribe(
      (res: ItemTypes[]) => {
        if (res.length > 0) {
          this.ItemTypesAll = res;
        }
      }
    );
    // === Get All ItemTypes from Server === //
    // === Get All Events from Server === //
    this.CRUDService.GetAll(this.EventsGetAllURL, this.lang).subscribe(
      (res: Events[]) => {
        if (res.length > 0) {
          this.eventsAll = res;
        }
      }
    );
    // === Get All Events from Server === //
  }
  // === repeat Get All === //
  /**
   * To know if server DB have set Language
   * and User start us the APP
   **/
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
