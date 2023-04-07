import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { EventsService } from 'src/app/Services/events/events.service';
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
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // === Get Event by ID === //
      this.routerURL.paramMap.subscribe((res) => {
        this.eventID = res.get('EventID');
        // console.log('eventID ::', this.eventID);
        this.eventsService
          .eventGet(this.url, lang, this.eventID)
          .subscribe((res: Events) => {
            this.event = res;
            // console.log('this.event ::', this.event);
          });
      });
      // === Get Event by ID === //
      // === Get All Events from Server === //
      this.eventsService
        .eventsGetAll(this.url, lang)
        .subscribe((res: Events[]) => {
          if (res.length > 0) {
            this.eventsAll = res;
          }
        });
      // === Get All Events from Server === //
    });
  }
  // GetEvent(lang: string, eventID: string) {
  //   this.eventsService
  //     .eventGet(this.url, lang, eventID)
  //     .subscribe((res: Events) => {
  //       this.event = res;
  //       console.log('this.event ::', this.event);
  //     });
  // }
}
