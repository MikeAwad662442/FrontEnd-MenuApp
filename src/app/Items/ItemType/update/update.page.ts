import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { CRUDService } from 'src/app/Services/Global/crud.service';
// === Services === //
// === Models ===== //
import { Language } from 'src/app/Model/cPanel/language.model';
import { ItemTypes, ItemTypesLanguage } from 'src/app/Model/items/items.model';
// === Models ===== //
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit, OnDestroy {
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
  ItemTypeUpdateURL: string = `${this.url}/ItemTypes/Update`;
  // === URL For CRUDService === //
  ItemTypeID: any; // === ItemTypes === //
  /**
   * get Active Languages & Active ItemTypes Language
   * to find if there are not the same
   **/
  ActiveLang!: Language[];
  ActiveItemType!: ItemTypes;

  // === *** FORM *** === //
  // === Form Group === //
  ItemTypeUpDate: FormGroup = this.fb.group({
    id: [null],
    image: ['', Validators.required],
    imgType: [''],
    active: [null],
    infoArray: this.fb.array<ItemTypesLanguage>([]),
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
      description: [description],
    });
  }
  // === Return AS ARRAY === //
  get infoArrayS(): FormArray {
    // === Name Description array === //
    return this.ItemTypeUpDate.get('infoArray') as FormArray;
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

  async ngOnInit() {
    this.ItemTypeUpDate.reset;
    this.routerURL.paramMap.subscribe((res) => {
      this.ItemTypeID = res.get('ItemTypeID');
    });
    // === Get Active Language === //
    this.languageService.langActive(this.url).subscribe((res) => {
      this.ActiveLang = res;
    });
    // === Get Active Language === //
    this.CRUDService.UpdateGetID(
      this.ItemTypeUpdateURL,
      this.ItemTypeID
    ).subscribe((res: ItemTypes) => {
      this.ActiveItemType = res;
    });

    /**
     * This method is wrong, but it works for now
     **/
    setTimeout(() => {
      this.ItemTypeUpdate();
    }, 1000);
    /**
     * This method is wrong, but it works for now
     **/
  }
  async ItemTypeUpdate() {
    if (this.ActiveItemType === null) {
      // === Get Active Language === //
      this.ActiveLang.forEach((data: Language) => {
        const langID: string = data.id;
        this.infoArrayS.push(this.arrayFormGroup(null, langID));
      });
      // === Get Active Language === //
    } else if (this.ActiveLang.length > this.ActiveItemType.info.length) {
      this.imageSrc = this.imageURL + this.ActiveItemType.image;
      this.ItemTypeUpDate.patchValue({
        id: this.ActiveItemType.id,
        image: this.ActiveItemType.image,
        imgType: this.ActiveItemType.imgType,
        active: this.ActiveItemType.active,
      });
      for (var i = 0; i < this.ActiveLang.length; i++) {
        // console.log(this.ActiveEvent.info[i]);
        // console.log(this.ActiveLang[i].id);
        if (
          this.ActiveItemType.info[i] === undefined ||
          this.ActiveLang[i].id !== this.ActiveItemType.info[i].lang
        ) {
          const data = this.ActiveLang[i].id;
          // console.log(data);
          this.infoArrayS.push(this.arrayFormGroup(null, data));
        } else {
          const data = this.ActiveItemType.info[i];
          this.infoArrayS.push(
            this.arrayFormGroup(data.id, data.lang, data.name, data.description)
          );
        }
      }
    } else {
      // === Get event Update By ID === //
      this.imageSrc = this.imageURL + this.ActiveItemType.image;
      this.ItemTypeUpDate.patchValue({
        id: this.ActiveItemType.id,
        image: this.ActiveItemType.image,
        imgType: this.ActiveItemType.imgType,
        active: this.ActiveItemType.active,
      });
      this.ActiveItemType.info.forEach((data: ItemTypesLanguage) => {
        this.infoArrayS.push(
          this.arrayFormGroup(data.id, data.lang, data.name, data.description)
        );
      });
      // === Get event Update By ID === //
    }
    // console.log('ActiveLang ::', this.ActiveLang);
    // console.log('ActiveEvent ::', this.ActiveEvent.info);
  }

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
        this.ItemTypeUpDate.patchValue({
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
        this.ItemTypeUpDate.patchValue({
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
    // === Form Data to Send Value === //
    if (this.ItemTypeUpDate.get('id')?.value !== null) {
      newForm.append('ID', this.ItemTypeUpDate.get('id')?.value);
    }
    newForm.append('File', this.ItemTypeUpDate.get('image')?.value);
    newForm.append('ImageType', this.ItemTypeUpDate.get('imgType')?.value);
    newForm.append('Active', this.ItemTypeUpDate.get('active')?.value);
    newForm.append(
      'InfoArray',
      JSON.stringify(this.ItemTypeUpDate.get('infoArray')?.value)
    ); // === Language Group === //
    // === Form Data to Send Value === //
    // this.eventsService.EventsUpdate(this.url, this.eventID, newForm)
    this.CRUDService.Update(
      this.ItemTypeUpdateURL,
      this.ItemTypeID,
      newForm
    ).subscribe((res: any) => {
      if (res === true) {
        this.ItemTypeUpDate.reset;
        this.alertServer.showAlert('insert.AlertStander', '/ItemType');
        // console.log('IF everything work well ::', res);
        this.CRUDService.RefreshGlobal$.next(res);
      }
    });
  }
  ngOnDestroy(): void {
    this.ItemTypeUpDate.reset;
  }
}
