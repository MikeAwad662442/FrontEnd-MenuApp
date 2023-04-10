import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// === Services === //
import { UrlService } from 'src/app/Services/Server/url.service';
import { EventsService } from 'src/app/Services/events/events.service';
import { LanguageService } from 'src/app/Services/cPanel/language.service';
import { AlertService } from 'src/app/Services/Alert/alert.service';
// === Services === //
// === Models ===== //
import { AllLanguage, Language } from 'src/app/Model/cPanel/language.model';
import { Events, EventsLanguage } from 'src/app/Model/events/events.model';

// === Models ===== //
@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  // === URL === //
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  // === URL === //
  // === Events === //
  eventID: any;
  // === *** FORM *** === //
  // === Form Group === //
  eventUpDate: FormGroup = this.fb.group({
    id: [null],
    image: ['', Validators.required],
    imgType: [''],
    active: [null],
    infoArray: this.fb.array<EventsLanguage>([]),
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
    return this.eventUpDate.get('infoArray') as FormArray;
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

  constructor(
    private fb: FormBuilder,
    private routerURL: ActivatedRoute,
    private urlService: UrlService,
    private eventsService: EventsService,
    private languageService: LanguageService,
    private alertServer: AlertService
  ) {}

  async ngOnInit() {
    this.routerURL.paramMap.subscribe((res) => {
      this.eventID = res.get('EventID');
      if (this.eventID !== null) {
        this.eventsService
          .eventUpdateID(this.url, this.eventID)
          .subscribe((res: Events) => {
            this.eventUpdateByID(res);
            // console.log('event Update ::', this.event);
          });
      } else {
        this.eventGetActiveLang();
      }
    });
  }
  // === Get event Update By ID === //
  eventUpdateByID(data: Events) {
    // console.log('data1 ::', data);
    this.imageSrc = this.imageURL + data.image;
    this.eventUpDate.patchValue({
      id: data.id,
      image: data.image,
      imgType: data.imgType,
      active: data.active,
      infoArray: data.info,
    });
    data.info.forEach((data: EventsLanguage) => {
      this.infoArrayS.push(
        this.arrayFormGroup(data.id, data.lang, data.name, data.description)
      );
    });
  }
  // === Get event Update By ID === //
  // === Get Active Language === //
  eventGetActiveLang() {
    this.languageService.langActive(this.url).subscribe((res) => {
      res.forEach((data: Language) => {
        const langID: string = data.id;
        this.infoArrayS.push(this.arrayFormGroup(null, langID));
      });
    });
  }
  // === Get Active Language === //
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
        this.eventUpDate.patchValue({
          image: this.file,
          imgType: this.fileType,
        });
      } else if (this.file.type.indexOf('video') > -1) {
        this.fileType = 'video';
        reader.onload = (e) => (this.imageSrc = reader.result);
        this.eventUpDate.patchValue({
          image: this.file,
          imgType: this.fileType,
        });
      } else {
        this.alertServer.errorAlertIMG(
          'Setting.SocialMedia.ERROR.FacilityImageType'
        );
        /**
         * If File that insert Not image
         * return Value to Null
         */
        this.eventUpDate.patchValue({
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
    if (this.eventUpDate.get('id')?.value !== null) {
      newForm.append('EventsID', this.eventUpDate.get('id')?.value);
    }
    newForm.append('File', this.eventUpDate.get('image')?.value);
    newForm.append('EventsImageType', this.eventUpDate.get('imgType')?.value);
    newForm.append('EventsActive', this.eventUpDate.get('active')?.value);
    newForm.append(
      'EventsInfoArray',
      JSON.stringify(this.eventUpDate.get('infoArray')?.value)
    ); // === Language Group === //
    // === Form Data to Send Value === //
    this.eventsService
      .EventsUpdate(this.url, this.eventID, newForm)
      .subscribe((res: any) => {
        if (res === true) {
          this.alertServer.showAlert('Alert.EventNew', '/events');
          // console.log('IF everything work well ::', res);
          this.eventsService.refreshEvents$.next(true);
        }
      });
  }
}
