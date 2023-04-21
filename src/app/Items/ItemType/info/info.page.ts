import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
// === Services === //
// === Models ===== //
import { ItemTypes } from 'src/app/Model/items/items.model';
// === Models ===== //
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  CRUDService = inject(CRUDService);
  routerURL = inject(ActivatedRoute);
  urlService = inject(UrlService);
  languageService = inject(LanguageService);
  alertServer = inject(AlertService);
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === URL For CRUDService === //
  ItemTypesGetAllURL: string = `${this.url}/ItemTypes/view`;
  ItemTypesDeleteURL: string = `${this.url}/ItemTypes/Update`;
  // === URL For CRUDService === //
  // === ItemTypes === //
  ItemTypeID: any;
  ItemType!: ItemTypes;
  ItemTypesAll!: ItemTypes[];
  async ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // === Get Event by ID === //
      this.routerURL.paramMap.subscribe((res) => {
        this.ItemTypeID = res.get('ItemTypeID');
        // this.eventsService.EventGet(this.url, lang, this.eventID)
        this.CRUDService.GetID(
          this.ItemTypesGetAllURL,
          lang,
          this.ItemTypeID
        ).subscribe((res: ItemTypes) => {
          /**
           * This method is wrong, but it works for now
           **/
          setTimeout(() => {
            this.ItemType = res;
          }, 1000);
          /**
           * This method is wrong, but it works for now
           **/
        });
      });
      // === Get Event by ID === //
      // === Get All Events from Server === //
      // this.eventsService.EventsGetAll(this.url, lang)
      this.CRUDService.GetAll(this.ItemTypesGetAllURL, lang).subscribe(
        (res: ItemTypes[]) => {
          if (res.length > 0) {
            this.ItemTypesAll = res;
          }
        }
      );
      // === Get All Events from Server === //
    });
  }
  // === Delete Event By ID === //
  DeleteItemTypeID() {
    // this.eventsService.EventsDelete(this.url, this.eventID)
    this.CRUDService.Delete(this.ItemTypesDeleteURL, this.ItemTypeID).subscribe(
      (res: any) => {
        if (res === true) {
          this.alertServer.showAlert('Alert.Event.DeleteAll', '/ItemType');
          // console.log('IF everything work well ::', res);
          this.CRUDService.RefreshGlobal$.next(res);
        }
      }
    );
  }
  // === Delete Event By ID === //
}
