import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { EventsService } from 'src/app/Services/events/events.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
// === Services === //
// === Models ===== //
import { Events } from 'src/app/Model/events/events.model';

// === Models ===== //
@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  imageSrc = './assets/icon/favicon.png';
  // === Events === //
  eventID: any;
  event!: Events;
  eventsAll!: Events[];
  constructor(
    private routerURL: ActivatedRoute,
    private urlService: UrlService,
    private eventsService: EventsService,
    private languageService: LanguageService,
    private alertServer: AlertService
  ) {}

  async ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // === Get Event by ID === //
      this.routerURL.paramMap.subscribe((res) => {
        this.eventID = res.get('EventID');
        // console.log('eventID ::', this.eventID);
        this.eventsService
          .EventGet(this.url, lang, this.eventID)
          .subscribe((res: Events) => {
            this.event = res;
            // console.log('this.event ::', this.event);
          });
      });
      // === Get Event by ID === //
      // === Get All Events from Server === //
      this.eventsService
        .EventsGetAll(this.url, lang)
        .subscribe((res: Events[]) => {
          if (res.length > 0) {
            this.eventsAll = res;
          }
        });
      // === Get All Events from Server === //
    });
  }
  // === Delete Event By ID === //
  DeleteEventID() {
    this.eventsService
      .EventsDelete(this.url, this.eventID)
      .subscribe((res: any) => {
        if (res === true) {
          this.alertServer.showAlert('Alert.EventNew', '/events');
          // console.log('IF everything work well ::', res);
          this.eventsService.refreshEvents$.next(res);
        }
      });
  }
  // === Delete Event By ID === //
}
