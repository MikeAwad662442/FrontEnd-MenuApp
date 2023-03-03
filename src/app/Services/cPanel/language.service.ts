import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subject, catchError } from 'rxjs';
// === Services === //
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
  public direction$ = new BehaviorSubject<string>('ltr');
  public langUse$ = new BehaviorSubject<string>('en');
  // === Start Observable to LocalStorage Default Language & Direction === //
  // ========================= //
  // === Translate Service === //
  // ========================= //
  private langActive$ = new Subject<Language>(); // Get Actives Languages from DB

  constructor(
    private http: HttpClient,
    private socketServer: SocketService,
    private expressService: ExpressService,
    private translate: TranslateService // === Translate Service === //
  ) {}
  // ========================= //
  // === Global Function ===== //
  // ========================= //
  // ================================================== //
  // === EXPRESS.js == //
  // ================= //
  // === get all items from Languages DB === //
  /* === Used in Pages:
   * Settings / C-Panel
   * Settings / Language
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
    console.log(langUse, direction);
    console.log(
      'MENU_LANG',
      localStorage.getItem(MENU_LANG),
      'MENU_DIR',
      localStorage.getItem(MENU_DIR)
    );
  }
  // === Get Default Language to Local Storage === //
  /* === Used in Pages:
   * Language
   */
  langStorageSetItem(data: Language) {
    // === translate === //
    this.translate.setDefaultLang(data.id); // === set Default Lang === //
    this.translate.use(data.id); // === set use Lang === //
    // === translate === //
    this.langUse$.next(data.id);
    this.direction$.next(data.direction); // === Direction of Pages === //
    localStorage.setItem(MENU_DIR, this.direction$.getValue());
    localStorage.setItem(MENU_LANG, this.langUse$.getValue());
    // localStorage.setItem(MENU_DIR, data.direction);
    // localStorage.setItem(MENU_LANG, data.id);
  }
  // === Get Default Language to Local Storage === //
  // ========================= //
  // === Default Functions === //
  // ========================= //
}
