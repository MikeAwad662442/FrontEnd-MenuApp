import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// === Services === //
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
// === Services === //
// === Models ===== //
import { Language, defaultLanguage } from 'src/app/Model/cPanel/language.model';
// === Models ===== //
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  url: string = this.urlService.url;
  defaultLang!: string; // === Get Default Language
  upLanguage: FormGroup = this.fb.group({
    languages: this.fb.array<Language>([]),
  });
  constructor(
    private fb: FormBuilder,
    // private routerURL: ActivatedRoute,
    private urlService: UrlService,
    private alertServer: AlertService,
    private languageService: LanguageService
  ) {}
  // === Return AS ARRAY === //
  get lanGuaGeS(): FormArray {
    return this.upLanguage.get('languages') as FormArray;
  }
  // === Return AS ARRAY === /
  ngOnInit() {
    this.getLanguage();
  }
  // === get all items from Languages DB === //
  getLanguage() {
    this.languageService.langGetAll(this.url).subscribe((res: Language[]) => {
      if (res.length !== 0) {
        res.forEach((data: Language) => {
          if (data.default === true) {
            this.defaultLang = data.id;
          }
          this.lanGuaGeS.push(this.arrayFormGroup(data));
        });
      } else {
        defaultLanguage.forEach((data: Language) => {
          if (data.default === true) {
            this.defaultLang = data.id;
          }
          this.lanGuaGeS.push(this.arrayFormGroup(data));
        });
      }
      this.upLanguage.patchValue({
        languages: this.lanGuaGeS.value,
      });
    });
  }
  // === get all items from Languages DB === //
  // === Form Array === //
  arrayFormGroup(data: Language): FormGroup {
    return this.fb.group({
      id: [data.id],
      name: [data.name],
      direction: [data.direction],
      active: [data.active],
      default: [data.default],
    });
  }
  // === Form Array === //
  // === Receive Changes From Radio button === //
  radioGroupChange(event: any) {
    const newDef = this.lanGuaGeS.value;
    const defaultID = event.detail.value;
    const newValue = newDef.map((e: Language) => {
      if (e.id === defaultID) {
        e.default = true;
      } else {
        e.default = false;
      }
      return e;
    });
    this.lanGuaGeS.setValue(newValue);
  }
  // === Receive Changes From Radio button === //
  // === Send Update DATA to Server === //
  submitForm() {
    const res: Language[] = this.upLanguage.get('languages')?.value;
    // console.log('languages value', res);
    res.forEach((data: Language) => {
      if (data.default === true) {
        this.languageService.saveLanguage(data.direction, data.id);
      }
    });
    this.languageService.langUpdate(this.url, res).subscribe((e: any) => {
      if (e === true) {
        // this.alertServer.showAlert('the language update', '/cpanel');
        this.alertServer.showAlert('Alert.UpLanguage', '/cpanel');
      }
      // console.log(res);
      // this.ngOnDestroy(); // === No need i us http
    });
  }
}
