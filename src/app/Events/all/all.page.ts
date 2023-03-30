import { Component, OnInit } from '@angular/core';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { EventsService } from 'src/app/Services/events/events.service';
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
  eventsAll: Events[] | undefined;
  constructor(
    private urlService: UrlService,
    private eventsService: EventsService
  ) {}

  async ngOnInit() {
    await this.GetAllEvents();
  }
  async GetAllEvents() {
    this.eventsService.eventsGetAll(this.url).subscribe((res: Events[]) => {
      if (res.length > 0) {
        this.eventsAll = res;
      }
      console.log(res);
    });
  }
}
