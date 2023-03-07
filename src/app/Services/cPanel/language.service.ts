import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject, catchError } from 'rxjs';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { SocketService } from 'src/app/Services/Server/socket.service'; // حاليا ليس لي عمل به
import { ExpressService } from 'src/app/Services/Server/express.service';
// === Services === //
// === Models ===== //
import { Language, defaultLanguage } from 'src/app/Model/cPanel/language.model';

// === Models ===== //

// = Local Storage= //
const MENU_DIR = 'MENU_DIR';
const MENU_LANG = 'MENU_LANG';
// = Local Storage= //
@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  // ========================= //
  // === Translate Service === //
  // ========================= //
  // === Start Observable to LocalStorage Default Language & Direction === //
  direction$ = new BehaviorSubject<string>('ltr');
  langUse$ = new BehaviorSubject<string>('en');
  // === Start Observable to LocalStorage Default Language & Direction === //
  // ========================= //
  // === Translate Service === //
  // ========================= //
  private langActive$ = new Subject<Language>(); // Get Actives Languages from DB

  constructor(
    private http: HttpClient,
    // private urlService: UrlService,
    private socketServer: SocketService,
    private expressService: ExpressService,
    private translate: TranslateService // === Translate Service === //
  ) {}
  // ========================= //
  // === Global Function ===== //
  // ========================= //
  // === Use to check Language in Server or not & set Default Language  === //
  /* === Used in Pages:
   * app.component.ts
   */
  appLang(url: string) {
    // === First Log in to server of APP === /
    // console.log(
    //   'First Log in MENU_LANG',
    //   localStorage.getItem(MENU_LANG),
    //   'First Log in MENU_DIR',
    //   localStorage.getItem(MENU_DIR)
    // );
    // === First Log in to server of APP === /
    // const url = this.urlService.url;
    const lang = localStorage.getItem(MENU_LANG);
    const dir = localStorage.getItem(MENU_DIR);
    if (lang === null && dir === null) {
      this.langGetAll(url).subscribe((res: Language[]) => {
        if (res.length === 0) {
          // console.log('Language not fond in DB :', res);
          defaultLanguage.forEach((data: Language) => {
            if (data.default === true) {
              this.langUse$.next(data.id); // === set use Lang === //
              this.direction$.next(data.direction); // === Direction of Pages === //
            }
          });
        } else {
          // console.log('Language:Default3', res);
          res.forEach((data: Language) => {
            if (data.default === true) {
              this.langUse$.next(data.id); // === set use Lang === //
              this.direction$.next(data.direction); // === Direction of Pages === //
            }
          });
        }
      });
    } else {
      this.langUse$.next(lang!); // === set use Lang === //
      this.direction$.next(dir!); // === Direction of Pages === //
    }
    this.saveLanguage(this.direction$.value, this.langUse$.value);
  }
  // ================================================== //
  // === EXPRESS.js == //
  // ================= //
  // === get all items from Languages DB === //
  /* === Used in Pages:
   * Settings / C-Panel
   * Settings / Language
   * Popover / Language
   */
  langGetAll(url: string): Observable<Language[]> {
    // console.log('this.url:', url);
    return this.http
      .get<Language[]>(`${url}language`)
      .pipe(catchError(this.expressService.handleError));
  }
  // === get all items from Languages DB === //
  // === Update all items to Languages DB == //
  /* === Used in Pages:
   * Settings / Language
   */
  langUpdate(url: string, data: Language[]): Observable<Language[]> {
    // console.log('this.url:', url);
    return this.http
      .put<Language[]>(`${url}language`, data)
      .pipe(catchError(this.expressService.handleError));
  }
  // === Update all items to Languages DB === //
  // === Get Active Language From Server ==== //
  /* === Used in Pages:
   * Popover / Language
   */
  langActive(url: string): Observable<Language[]> {
    // console.log('this.url:', url);
    return this.http
      .get<Language[]>(`${url}language/langActive`)
      .pipe(catchError(this.expressService.handleError));
  }
  // ================= //
  // === EXPRESS.js == //
  // ================================================== //
  // ========================= //
  // === Global Function ===== //
  // ========================= //
  // === Default Functions === //
  // ========================= //
  saveLanguage(direction: string, langUse: string) {
    localStorage.setItem(MENU_DIR, direction);
    localStorage.setItem(MENU_LANG, langUse);
    this.translate.setDefaultLang(langUse); // === set Default Lang === //
    this.translate.use(langUse); // === set use Lang === //
    this.langUse$.next(langUse); // === set use Lang === //
    this.direction$.next(direction); // === Direction of Pages === //
    // console.log(langUse, direction);
    // console.log(
    //   'MENU_LANG',
    //   localStorage.getItem(MENU_LANG),
    //   'MENU_DIR',
    //   localStorage.getItem(MENU_DIR)
    // );
  }
  // // === Get Default Language to Local Storage === //
  // /* === Used in Pages:
  //  * Language
  //  */
  // langStorageSetItem(data: Language) {
  //   // === translate === //
  //   this.translate.setDefaultLang(data.id); // === set Default Lang === //
  //   this.translate.use(data.id); // === set use Lang === //
  //   // === translate === //
  //   this.langUse$.next(data.id);
  //   this.direction$.next(data.direction); // === Direction of Pages === //
  //   localStorage.setItem(MENU_DIR, this.direction$.getValue());
  //   localStorage.setItem(MENU_LANG, this.langUse$.getValue());
  //   // localStorage.setItem(MENU_DIR, data.direction);
  //   // localStorage.setItem(MENU_LANG, data.id);
  // }
  // // === Get Default Language to Local Storage === //
  // === Start Observable to LocalStorage Default Language & Direction === //
  refreshDirection(): Observable<string> {
    console.log('refreshDirection :', this.direction$);
    return this.direction$;
  }
  // ========================= //
  // === Default Functions === //
  // ========================= //
}
