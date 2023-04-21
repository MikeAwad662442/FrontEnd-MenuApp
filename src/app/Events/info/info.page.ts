import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
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
  CRUDService = inject(CRUDService);
  routerURL = inject(ActivatedRoute);
  urlService = inject(UrlService);
  languageService = inject(LanguageService);
  alertServer = inject(AlertService);
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === URL For CRUDService === //
  EventsGetAllURL: string = `${this.url}/events/view`;
  EventDeleteURL: string = `${this.url}/events/Update`;
  // === URL For CRUDService === //
  // === Events === //
  eventID: any;
  event!: Events;
  eventsAll!: Events[];

  async ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe((res) => {
      const lang = res;
      // === Get Event by ID === //
      this.routerURL.paramMap.subscribe((res) => {
        this.eventID = res.get('EventID');
        // this.eventsService.EventGet(this.url, lang, this.eventID)
        this.CRUDService.GetID(
          this.EventsGetAllURL,
          lang,
          this.eventID
        ).subscribe((res: Events) => {
          this.event = res;
        });
      });
      // === Get Event by ID === //
      // === Get All Events from Server === //
      // this.eventsService.EventsGetAll(this.url, lang)
      this.CRUDService.GetAll(this.EventsGetAllURL, lang).subscribe(
        (res: Events[]) => {
          if (res.length > 0) {
            this.eventsAll = res;
          }
        }
      );
      // === Get All Events from Server === //
    });
  }
  // === Delete Event By ID === //
  DeleteEventID() {
    // this.eventsService.EventsDelete(this.url, this.eventID)
    this.CRUDService.Delete(this.EventDeleteURL, this.eventID).subscribe(
      (res: any) => {
        if (res === true) {
          this.alertServer.showAlert('Alert.Event.DeleteAll', '/events');
          // console.log('IF everything work well ::', res);
          this.CRUDService.RefreshGlobal$.next(res);
        }
      }
    );
  }
  // === Delete Event By ID === //
}
