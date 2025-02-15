/**
 * ItemType Info Page
 * must contain
 * List name and image
 * The content of the list is from the materials included in the list
 **/

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
import { ItemTypePage } from 'src/app/Popover/item-type/item-type.page';
// === Services === //
// === Models ===== //
import {
  ItemTypes,
  ItemTypesLanguage,
  Items,
} from 'src/app/Model/items/items.model';
// === Models ===== //
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  popoverCtrl = inject(PopoverController);
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
  ItemsGetAllURL: string = `${this.url}/Items/view`;
  // === URL For CRUDService === //
  // === ItemTypes === //
  ItemType!: ItemTypes;
  ItemTypesAll!: ItemTypes[];
  ItemsAll!: Items[];
  ItemTypeID: any;
  ItemTypeName!: string;
  ItemTypeImage: any;
  ItemTypeDescription!: string;
  lang!: string;
  // === ItemTypes === //
  async ngOnInit() {
    // === Get ItemTypeID === //
    this.routerURL.paramMap.subscribe(async (res) => {
      this.ItemTypeID = res.get('ItemTypeID');
    });
    // === Get ItemTypeID === //
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe(async (res) => {
      this.lang = res;
      await this.GetALL();
    });
    await this.GetALL();
  }
  // === repeat Get All === //
  async GetALL() {
    // === Get All ItemTypesID from Server === //
    this.CRUDService.GetID(
      this.ItemTypesGetAllURL,
      this.lang,
      this.ItemTypeID
    ).subscribe(async (res: ItemTypes) => {
      // console.log('ItemTypes ::', res);
      this.ItemType = res;
      // console.log('ItemTypesINFO', this.ItemType);
      this.ItemTypeImage = this.imageURL + res.image;
      res.info.forEach(async (info: ItemTypesLanguage) => {
        this.ItemTypeName = info.name;
        this.ItemTypeDescription = info.description;
      });
    });
    // === Get All ItemTypesID from Server === //
    // === Get All Items from Server === //
    this.CRUDService.GetID(
      this.ItemsGetAllURL,
      this.lang,
      this.ItemTypeID
    ).subscribe((res: Items[]) => {
      if (res.length > 0) {
        this.ItemsAll = res;
        // console.log('ItemsAll ::', this.ItemsAll);
      }
    });
    // === Get All Items from Server === //
    // // === Get All ItemTypes from Server === //
    // this.CRUDService.GetAll(this.ItemTypesGetAllURL, lang).subscribe(
    //   (res: ItemTypes[]) => {
    //     if (res.length > 0) {
    //       this.ItemTypesAll = res;
    //     }
    //   }
    // );
    // // === Get All ItemTypes from Server === //
  }
  // === repeat Get All === //
  get style() {
    return {
      backgroundImage: ` url(${this.ItemTypeImage})`,
    };
  }
  async ItemTypeInfoID() {}
  ItemsGetAll(ItemTypeRes: any[]) {}
  // === Delete Event By ID === //
  DeleteItemTypeID() {
    // this.eventsService.EventsDelete(this.url, this.eventID)
    this.CRUDService.Delete(this.ItemTypesDeleteURL, this.ItemTypeID).subscribe(
      (res: any) => {
        if (res === true) {
          this.CRUDService.RefreshGlobal$.next(res);
          this.alertServer.showAlert('insert.AlertStander', '/ItemType');
          // console.log('IF everything work well ::', res);
        }
      }
    );
  }
  // === Delete Event By ID === //
  // === ItemTypes Popover === //
  /**
   * Get All Items Type to see in the page and Works on it
   **/
  async ItemTypesPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: ItemTypePage,
      event: ev,
    });
    await popover.present();
    // console.log('langPopover:', ev.detail.value);
  }
  // === ItemTypes Popover === //
}
