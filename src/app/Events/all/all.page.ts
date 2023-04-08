import { Component, OnInit } from '@angular/core';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { EventsService } from 'src/app/Services/events/events.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
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
    private languageService: LanguageService
  ) {}

  async ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // console.log('New Lang ::', lang);
      // === Get All Events from Server === //
      this.eventsService
        .eventsGetAll(this.url, lang)
        .subscribe((res: Events[]) => {
          if (res.length > 0) {
            this.eventsAll = res;
            // console.log('eventsAll ::', this.eventsAll);
          }
        });
      // === Get All Events from Server === //
    });
  }
  // async GetAllEvents(lang: string) {
  //   this.eventsService
  //     .eventsGetAll(this.url, lang)
  //     .subscribe((res: Events[]) => {
  //       if (res.length > 0) {
  //         this.eventsAll = res;
  //       }
  //     });
  // }
}
