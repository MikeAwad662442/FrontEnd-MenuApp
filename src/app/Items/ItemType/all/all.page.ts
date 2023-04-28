import { Component, OnInit, inject } from '@angular/core';
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
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {
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

  ngOnInit() {
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
  // === Delete All temTypes === //
  DeleteItemTypes() {
    this.CRUDService.Delete(this.ItemTypesDeleteAllURL).subscribe(
      (res: any) => {
        if (res === true) {
          console.log(res);
          this.CRUDService.RefreshGlobal$.next(res);
          this.alertServer.showAlert('Alert.Event.DeleteAll', '/ItemType');
          this.ItemTypesAll = [];
          console.log(this.ItemTypesAll);
          // window.location.reload();
        }
      }
    );
  }
  // === Delete All temTypes === //
}
