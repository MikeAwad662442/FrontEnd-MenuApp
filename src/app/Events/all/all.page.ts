import { Component, OnInit, inject } from '@angular/core';
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
  EventsGetAllURL: string = `${this.url}/events/view`;
  EventsDeleteAllURL: string = `${this.url}/events/Update`;
  // === URL For CRUDService === //
  // === Events === //
  eventsAll!: Events[];
  lang!: string;
  async ngOnInit() {
    // === if Language View is change refresh the info
    this.languageService.langUse$.subscribe(async (res) => {
      this.lang = res;
      await this.GetALL();
    });
    this.CRUDService.RefreshGlobal$.subscribe(async () => {
      await this.GetALL();
    });
    await this.GetALL();
  }
  // === repeat Get All === //
  async GetALL() {
    // === Get All Events from Server === //
    this.CRUDService.GetAll(this.EventsGetAllURL, this.lang).subscribe(
      (res: Events[]) => {
        if (res.length > 0) {
          this.eventsAll = res;
        }
      }
    );
    // === Get All Events from Server === //
  }
  // === repeat Get All === //
  // === Delete All Events === //
  DeleteEvents() {
    // this.eventsService.EventsDelete(this.url)
    this.CRUDService.Delete(this.EventsDeleteAllURL).subscribe((res: any) => {
      if (res === true) {
        // this.CRUDService.RefreshGlobal$.next(res);
        this.alertServer.showAlert('insert.AlertStander', '/events');
        location.reload();
      }
    });
  }
  // === Delete All Events === //
}
