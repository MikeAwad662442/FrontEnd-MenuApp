import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { EventsService } from 'src/app/Services/events/events.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
// === Services === //
// === Models ===== //
import { Events } from 'src/app/Model/events/events.model';

// === Models ===== //
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  imageSrc = './assets/icon/favicon.png';
  // === Events === //
  eventsAll!: Events[];
  constructor(
    private urlService: UrlService,
    private eventsService: EventsService,
    private languageService: LanguageService,
    private alertServer: AlertService
  ) {}

  async ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // console.log('New Lang ::', lang);
      this.eventsService.refreshEvents$.subscribe((res) => {
        // === Get All Events from Server === //
        this.eventsService
          .EventsGetAll(this.url, lang)
          .subscribe((res: Events[]) => {
            if (res.length > 0) {
              this.eventsAll = res;
              // console.log('eventsAll ::', this.eventsAll);
            }
          });
        // === Get All Events from Server === //
      });
      // === Get All Events from Server === //
      this.eventsService
        .EventsGetAll(this.url, lang)
        .subscribe((res: Events[]) => {
          if (res.length > 0) {
            this.eventsAll = res;
            console.log('eventsAll ::', this.eventsAll);
          }
        });
      // === Get All Events from Server === //
    });
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // // The `from` and `to` properties contain the index of the item
    // // when the drag started and ended, respectively
    // // console.log('Dragged Event Full info', ev);
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    // === Move Item to New Location === //
    const ItemToMove = this.eventsAll.splice(ev.detail.from, 1)[0];
    this.eventsAll.splice(ev.detail.to, 0, ItemToMove);
    // === Move Item to New Location === //
    let Num: number = 1;
    this.eventsAll.forEach((data: Events) => {
      data.listNum = Num;
      return (Num = ++Num);
    });
    ev.detail.complete();
    console.log('New order List eventsAll ::', this.eventsAll);
  }
  submitOrder() {
    console.log('New order List eventsAll Final ::', this.eventsAll);
    this.eventsService
      .EventsOrderList(this.url, this.eventsAll)
      .subscribe((res: any) => {
        if (res === true) {
          this.alertServer.showAlert('Alert.Event.AddNew', '/events');
          // console.log('IF everything work well ::', res);
          this.eventsService.refreshEvents$.next(res);
        }
      });
  }
}
