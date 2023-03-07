import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { EventsService } from 'src/app/Services/events/events.service';
import { ItemtypeService } from 'src/app/Services/items/itemtype.service';
// === Services === //
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
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

  ngOnInit() {}
}
