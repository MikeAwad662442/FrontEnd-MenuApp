import { Component, OnInit, inject } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
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
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
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
  ItemTypesOrderListURL: string = `${this.url}/ItemTypes/OrderList`;
  // === URL For CRUDService === //
  // === ItemTypes === //
  ItemTypesAll!: ItemTypes[];
  async ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // console.log('New Lang ::', lang);
      this.CRUDService.RefreshGlobal$.subscribe((res) => {
        // === Get All Events from Server === //
        this.CRUDService.GetAll(this.ItemTypesGetAllURL, lang).subscribe(
          (res: ItemTypes[]) => {
            if (res.length > 0) {
              this.ItemTypesAll = res;
            }
          }
        );
        // === Get All Events from Server === //
      });
      // === Get All Events from Server === //
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
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // // The `from` and `to` properties contain the index of the item
    // // when the drag started and ended, respectively
    // // console.log('Dragged Event Full info', ev);
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    // === Move Item to New Location === //
    const ItemToMove = this.ItemTypesAll.splice(ev.detail.from, 1)[0];
    this.ItemTypesAll.splice(ev.detail.to, 0, ItemToMove);
    // === Move Item to New Location === //
    let Num: number = 1;
    this.ItemTypesAll.forEach((data: ItemTypes) => {
      data.listNum = Num;
      return (Num = ++Num);
    });
    ev.detail.complete();
    // console.log('New order List eventsAll ::', this.eventsAll);
  }
  submitOrder() {
    // console.log('New order List eventsAll Final ::', this.eventsAll);
    // this.eventsService.EventsOrderList(this.url, this.eventsAll)
    this.CRUDService.OrderList(
      this.ItemTypesOrderListURL,
      this.ItemTypesAll
    ).subscribe((res: any) => {
      if (res === true) {
        this.alertServer.showAlert('Alert.Event.AddNew', '/ItemType');
        // console.log('IF everything work well ::', res);
        this.CRUDService.RefreshGlobal$.next(res);
      }
    });
  }
}
