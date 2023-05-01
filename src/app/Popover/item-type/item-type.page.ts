import { Component, OnInit, inject } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';

// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
// === Services === //
// === Models ===== //
import { ItemTypes } from 'src/app/Model/items/items.model';
// === Models ===== //

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.page.html',
  styleUrls: ['./item-type.page.scss'],
})
export class ItemTypePage implements OnInit {
  popoverCtrl = inject(PopoverController);
  menu = inject(MenuController);
  CRUDService = inject(CRUDService);
  urlService = inject(UrlService);
  languageService = inject(LanguageService);
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === URL For CRUDService === //
  ItemTypesGetAllURL: string = `${this.url}/ItemTypes/view`;
  // === URL For CRUDService === //
  // === ItemTypes === //
  ItemTypesAll!: ItemTypes[];
  ItemTypesUsed = '';
  async ngOnInit() {
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
    });
  }
  ItemTypesChange(event: ItemTypes) {
    this.popoverCtrl.dismiss();
  }
}
