/**
 * Item Info Page
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
import { Items, ItemsLanguage } from 'src/app/Model/items/items.model';
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
  ItemsGetAllURL: string = `${this.url}/Items/view`;
  // ItemTypesGetAllURL: string = `${this.url}/ItemTypes/view`;
  ItemDeleteURL: string = `${this.url}/Items/Update`;
  // === URL For CRUDService === //
  // === Item by ID && All Items === //
  ItemTypeID: any; // The ItemType For All Items
  ItemsAll!: Items[];
  // === Item INFO === //
  ItemID: any;
  ItemImage: any;
  ItemListNum: any;
  ItemImgType!: string;
  ItemActive!: boolean;
  ItemPrice!: number;
  ItemName!: string;
  ItemDescription!: string;
  lang!: string;
  // === Item INFO === //
  // === Item by ID && All Items === //
  async ngOnInit() {
    // === Get ItemID === //
    this.routerURL.paramMap.subscribe(async (res) => {
      this.ItemID = res.get('ItemID');
    });
    // === Get ItemID === //
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe(async (res) => {
      this.lang = res;
      await this.GetALL();
    });
    // === if Language View is change refresh the info
    this.CRUDService.RefreshGlobal$.subscribe(async () => {
      await this.GetALL();
    });
    await this.GetALL();
  }
  // === repeat Get All === //
  async GetALL() {
    // === Get All Items && ItemID from Server === //
    this.CRUDService.GetID(
      this.ItemsGetAllURL,
      this.lang,
      this.ItemID
    ).subscribe(async (res: Items) => {
      // console.log('Items ::', res);
      // === Get ItemID from Server === //

      this.ItemTypeID = res.ItemTypeID;
      // console.log('ItemTypesINFO', this.ItemType);
      this.ItemImage = this.imageURL + res.image;
      this.ItemImgType = res.imgType;
      this.ItemPrice = res.price;
      res.info.forEach(async (info: ItemsLanguage) => {
        this.ItemName = info.name;
        this.ItemDescription = info.description;
      });

      // === Get ItemID from Server === //
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
    });
    // === Get All Items && ItemID from Server === //
  }
  // === repeat Get All === //
  // === Delete Event By ID === //
  DeleteItemID() {
    // this.eventsService.EventsDelete(this.url, this.eventID)
    this.CRUDService.Delete(this.ItemDeleteURL, this.ItemID).subscribe(
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
