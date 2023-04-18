import { Component, OnInit } from '@angular/core';
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
  selector: 'app-all',
  templateUrl: './all.page.html',
  styleUrls: ['./all.page.scss'],
})
export class AllPage implements OnInit {
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
            // console.log('eventsAll ::', this.eventsAll);
          }
        });
      // === Get All Events from Server === //
    });
  }
  // === Delete All Events === //
  DeleteEvents() {
    this.eventsService.EventsDelete(this.url).subscribe((res: any) => {
      if (res === true) {
        this.alertServer.showAlert('Alert.Event.DeleteAll', '/events');
        console.log('IF everything work well ::', res);
        this.eventsService.refreshEvents$.next(res);
      }
    });
  }
  // === Delete All Events === //
}
