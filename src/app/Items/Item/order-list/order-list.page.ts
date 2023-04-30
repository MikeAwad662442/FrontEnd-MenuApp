import { Component, OnInit, inject } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
// === Services === //
// === Models ===== //
import { Items } from 'src/app/Model/items/items.model';
// === Models ===== //
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  routerURL = inject(ActivatedRoute);
  CRUDService = inject(CRUDService);
  urlService = inject(UrlService);
  languageService = inject(LanguageService);
  alertServer = inject(AlertService);
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === URL For CRUDService === //
  ItemsGetAllURL: string = `${this.url}/Items/view`;
  ItemsOrderListURL: string = `${this.url}/Items/OrderList`;
  // === URL For CRUDService === //
  // === ItemTypes === //
  ItemsAll!: Items[];
  ItemTypeID: any;
  async ngOnInit() {
    this.routerURL.paramMap.subscribe((res) => {
      this.ItemTypeID = res.get('ItemTypeID');
      console.log(this.ItemTypeID);
    });
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // console.log('New Lang ::', lang);
      // === Get All Items from Server === //
      this.CRUDService.GetID(
        this.ItemsGetAllURL,
        lang,
        this.ItemTypeID
      ).subscribe((res: Items[]) => {
        console.log(res);
        if (res.length > 0) {
          this.ItemsAll = res;
        }
      });
      // === Get All Items from Server === //
    });
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // // The `from` and `to` properties contain the index of the item
    // // when the drag started and ended, respectively
    // // console.log('Dragged Event Full info', ev);
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    // === Move Item to New Location === //
    const ItemToMove = this.ItemsAll.splice(ev.detail.from, 1)[0];
    this.ItemsAll.splice(ev.detail.to, 0, ItemToMove);
    // === Move Item to New Location === //
    let Num: number = 1;
    this.ItemsAll.forEach((data: Items) => {
      data.listNum = Num;
      return (Num = ++Num);
    });
    ev.detail.complete();
    // console.log('New order List eventsAll ::', this.eventsAll);
  }
  submitOrder() {
    // console.log('New order List eventsAll Final ::', this.eventsAll);
    // this.eventsService.EventsOrderList(this.url, this.eventsAll)
    this.CRUDService.OrderList(this.ItemsOrderListURL, this.ItemsAll).subscribe(
      (res: any) => {
        if (res === true) {
          this.alertServer.showAlert('insert.AlertStander', '/ItemType');
          // console.log('IF everything work well ::', res);
          this.CRUDService.RefreshGlobal$.next(res);
        }
      }
    );
  }
}
