import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { EventsService } from 'src/app/Services/events/events.service';
import { ItemtypeService } from 'src/app/Services/items/itemtype.service';
// === Services === //
// === Models ===== //
import { Language } from 'src/app/Model/cPanel/language.model';
// === Models ===== //
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  url: string = this.urlService.url;
  newDB: boolean = false;
  params = {
    appName: 'MENU app',
  };
  constructor(
    private urlService: UrlService,
    private routerURL: ActivatedRoute,
    private languageService: LanguageService,
    private itemTypeService: ItemtypeService,
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.firstIsFirst();
    console.log(this.newDB);
  }
  firstIsFirst() {
    this.languageService.langGetAll(this.url).subscribe((res: Language[]) => {
      if (res.length !== 0) {
        this.newDB = true;
      }
    });
  }
}
