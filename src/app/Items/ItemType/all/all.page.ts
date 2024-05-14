import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
import { ItemTypePage } from 'src/app/Popover/item-type/item-type.page';
// === Services === //
// === Models ===== //
import { ItemTypes } from 'src/app/Model/items/items.model';

// === Models ===== //

@Component({
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit, OnDestroy {
  routerURL = inject(ActivatedRoute);
  popoverCtrl = inject(PopoverController);
  CRUDService = inject(CRUDService);
  urlService = inject(UrlService);
  languageService = inject(LanguageService);
  alertServer = inject(AlertService);
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === URL For CRUDService === //
  ItemTypesGetAllURL: string = `${this.url}/ItemTypes/view`;
  ItemTypesDeleteAllURL: string = `${this.url}/ItemTypes/Update`;
  // === URL For CRUDService === //
  // === ItemTypes === //
  ItemTypesAll!: ItemTypes[];
  lang!: string;
  async ngOnInit() {
    // === تحدث الصفحة كلما دخلت عليها === //
    this.routerURL.paramMap.subscribe(async () => {
      await this.GetALL();
    });
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe(async (res) => {
      this.lang = res;
      await this.GetALL();
    });
    this.CRUDService.RefreshGlobal$.subscribe(async () => {
      await this.GetALL();
    });
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
  }
  // === repeat Get All === //
  // === Delete All temTypes === //
  DeleteItemTypes() {
    this.CRUDService.Delete(this.ItemTypesDeleteAllURL).subscribe(
      (res: any) => {
        if (res === true) {
          this.CRUDService.RefreshGlobal$.next(res);
          this.alertServer.showAlert('Alert.Event.DeleteAll', '/ItemType');
          location.reload();
        }
      }
    );
  }
  // === Delete All temTypes === //
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
  ngOnDestroy(): void {
    this.ItemTypesAll.length = 0;
  }
}
