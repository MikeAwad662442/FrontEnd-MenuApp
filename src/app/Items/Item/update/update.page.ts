import { Component, OnInit, inject, LOCALE_ID } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// === Insert Pipe In TS === //
/**
 * use to control the style of Price Number
 **/
import { CurrencyPipe } from '@angular/common';
// === Insert Pipe In TS === //
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
// === Services === //
// === Models ===== //
import { Language } from 'src/app/Model/cPanel/language.model';
import { Items, ItemsLanguage } from 'src/app/Model/items/items.model';
// === Models ===== //

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  fb = inject(FormBuilder);
  routerURL = inject(ActivatedRoute);
  CRUDService = inject(CRUDService);
  urlService = inject(UrlService);
  languageService = inject(LanguageService);
  alertServer = inject(AlertService);
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === URL For CRUDService === //
  ItemUpdateURL: string = `${this.url}/Items/Update`;
  // === URL For CRUDService === //
  ItemID: any; // === Items === //
  ItemTypeID: any; // === ItemTypes === //
  /**
   * get Active Languages & Active ItemTypes Language
   * to find if there are not the same
   **/
  ActiveLang!: Language[];
  ActiveItem!: Items;

  // === *** FORM *** === //
  // === Form Group === //
  ItemUpDate: FormGroup = this.fb.group({
    id: [null],
    ItemTypeID: [null],
    image: ['', Validators.required],
    imgType: [''],
    active: [null],
    price: [null],
    infoArray: this.fb.array<ItemsLanguage>([]),
  });
  // === Form Group === //
  // === Form Array === //
  arrayFormGroup(
    id?: any,
    lang?: string,
    name?: string,
    description?: string
  ): FormGroup {
    return this.fb.group({
      id: [id],
      lang: [lang, [Validators.required]],
      name: [name, [Validators.required, Validators.minLength(2)]],
      description: [
        description,
        [Validators.required, Validators.minLength(10)],
      ],
    });
  }
  // === Return AS ARRAY === //
  get infoArrayS(): FormArray {
    // === Name Description array === //
    return this.ItemUpDate.get('infoArray') as FormArray;
  }
  // === Return AS ARRAY === /
  // === Form Array === //
  // === *** FORM *** === //
  // === to get Filses Info === //
  imageSrc: any; // './assets/icon/favicon.png';
  fileType!: string;
  file!: File;
  // === to get Filses Info === //
  // === Quill TEXT Editor === //
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline'], // toggled buttons
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { direction: 'rtl' }], // outdent/indent
    ],
  };
  // === Quill TEXT Editor === //
  ngOnInit() {
    // === Get Active Language === //
    this.languageService.langActive(this.url).subscribe((res) => {
      this.ActiveLang = res;
    });
    // === Get Active Language === //
    this.routerURL.paramMap.subscribe((res) => {
      this.ItemID = res.get('ItemID');
      this.CRUDService.UpdateGetID(this.ItemUpdateURL, this.ItemID).subscribe(
        (res: Items) => {
          this.ActiveItem = res;
        }
      );
    });
    /**
     * This method is wrong, but it works for now
     **/
    setTimeout(() => {
      this.ItemUpdate();
    }, 1000);
    /**
     * This method is wrong, but it works for now
     **/
  }
  async ItemUpdate() {
    if (this.ActiveItem === null) {
      this.ItemTypeID = this.ItemID;
      this.ItemID = null;
      this.ItemUpDate.patchValue({
        ItemTypeID: this.ItemTypeID,
      });
      // === Get Active Language === //
      this.ActiveLang.forEach((data: Language) => {
        const langID: string = data.id;
        console.log(data);
        this.infoArrayS.push(this.arrayFormGroup(null, langID));
      });
      // === Get Active Language === //
    } else if (this.ActiveLang.length > this.ActiveItem.info.length) {
      this.imageSrc = this.imageURL + this.ActiveItem.image;
      this.ItemUpDate.patchValue({
        id: this.ActiveItem.id,
        ItemTypeID: this.ActiveItem.ItemTypeID,
        image: this.ActiveItem.image,
        imgType: this.ActiveItem.imgType,
        active: this.ActiveItem.active,
        price: this.ActiveItem.price,
      });
      for (var i = 0; i < this.ActiveLang.length; i++) {
        // console.log(this.ActiveEvent.info[i]);
        // console.log(this.ActiveLang[i].id);
        if (
          this.ActiveItem.info[i] === undefined ||
          this.ActiveLang[i].id !== this.ActiveItem.info[i].lang
        ) {
          const data = this.ActiveLang[i].id;
          // console.log(data);
          this.infoArrayS.push(this.arrayFormGroup(null, data));
        } else {
          const data = this.ActiveItem.info[i];
          this.infoArrayS.push(
            this.arrayFormGroup(data.id, data.lang, data.name, data.description)
          );
        }
      }
    } else {
      // === Get event Update By ID === //
      this.imageSrc = this.imageURL + this.ActiveItem.image;
      this.ItemUpDate.patchValue({
        id: this.ActiveItem.id,
        ItemTypeID: this.ActiveItem.ItemTypeID,
        image: this.ActiveItem.image,
        imgType: this.ActiveItem.imgType,
        active: this.ActiveItem.active,
        price: this.ActiveItem.price,
      });
      this.ActiveItem.info.forEach((data: ItemsLanguage) => {
        this.infoArrayS.push(
          this.arrayFormGroup(data.id, data.lang, data.name, data.description)
        );
      });
      // === Get event Update By ID === //
    }
  }
  // === CurrencyPipe === //
  // === Get / Images || Videos / From UpLodFile === //
  async onFileChange(event: any) {
    this.file = event.target.files[0]; // === to get File info in Angular
    const reader = new FileReader();
    // === it must to be IMAGE === //
    if (this.file) {
      reader.readAsDataURL(this.file);
      if (this.file.type.indexOf('image') > -1) {
        this.fileType = 'image';
        reader.onload = (e) => (this.imageSrc = reader.result);
        this.ItemUpDate.patchValue({
          image: this.file,
          imgType: this.fileType,
        });
      }
      // === it must to be IMAGE === //
      else {
        this.alertServer.errorAlertIMG(
          'Setting.SocialMedia.ERROR.FacilityImageType'
        );
        /**
         * If File that insert Not image
         * return Value to Null
         */
        this.ItemUpDate.patchValue({
          image: null,
          imgType: null,
        });
      }
    }
  }
  // === Get / Images || Videos / From UpLodFile === //
  async submitForm() {
    const newForm = new FormData(); // === Because there is a picture I ned FormData()
    /**
     * If there is a picture,
     * it is preferable to send the information separately
     */
    console.log(this.ItemID);
    // === Form Data to Send Value === //
    if (this.ItemUpDate.get('id')?.value !== null) {
      newForm.append('ID', this.ItemUpDate.get('id')?.value);
    }
    newForm.append('ItemTypeID', this.ItemUpDate.get('ItemTypeID')?.value);
    newForm.append('File', this.ItemUpDate.get('image')?.value);
    newForm.append('ImageType', this.ItemUpDate.get('imgType')?.value);
    newForm.append('Active', this.ItemUpDate.get('active')?.value);
    newForm.append('Price', this.ItemUpDate.get('price')?.value);
    newForm.append(
      'InfoArray',
      JSON.stringify(this.ItemUpDate.get('infoArray')?.value)
    ); // === Language Group === //
    // === Form Data to Send Value === //
    // this.eventsService.EventsUpdate(this.url, this.eventID, newForm)
    this.CRUDService.Update(this.ItemUpdateURL, this.ItemID, newForm).subscribe(
      (res: any) => {
        if (res === true) {
          this.ItemUpDate.reset;
          this.alertServer.showAlert(
            'Alert.Event.AddNew',
            `/ItemType/info/${this.ItemTypeID}`
          );
          console.log('IF everything work well ::', res);
          this.CRUDService.RefreshGlobal$.next(res);
        }
      }
    );
  }
}
