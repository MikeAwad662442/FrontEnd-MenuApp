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
import { Events } from 'src/app/Model/events/events.model';

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
  imageSrc: any = './assets/icon/favicon.png';
  // === Events === //
  eventID: any;
  event!: Events;
  langActive!: Language[];
  // === *** FORM *** === //
  // === Form Group === //
  eventUpDate: FormGroup = this.fb.group({
    id: [null],
    image: ['', Validators.required],
    imgType: [''],
    active: [null],
    infoArray: this.fb.array<AllLanguage>([]),
  });
  // === Form Group === //
  // === Form Array === //
  arrayFormGroup(langID: string, data?: AllLanguage): FormGroup {
    return this.fb.group({
      lang: [langID || data?.lang, [Validators.required]],
      name: [
        null || data?.name,
        [Validators.required, Validators.minLength(2)],
      ],
      description: [null || data?.description],
    });
  }
  // === Form Array === //
  // === to get Filses Info === //
  fileType!: string;
  file!: File;
  // === to get Filses Info === //
  // === TEXT Editor === //
  modules = {
    toolbar: [
      // ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['bold', 'italic', 'underline', { header: 1 }, { header: 2 }], // toggled buttons
      // ['blockquote', 'code-block'],

      // [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
      // [{ direction: 'rtl' }], // text direction

      // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      // [{ header: [1, 2, 3, 4, 5, 6, false] }],

      // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      // [{ font: [] }],
      // [{ align: [] }],

      // ['clean'], // remove formatting button

      // ['link', 'image', 'video'], // link and image, video
    ],
  };
  // === TEXT Editor === //
  // === *** FORM *** === //

  constructor(
    private fb: FormBuilder,
    private routerURL: ActivatedRoute,
    private urlService: UrlService,
    private eventsService: EventsService,
    private languageService: LanguageService,
    private alertServer: AlertService
  ) {}
  // === Return AS ARRAY === //
  get infoArray(): FormArray {
    // === Name Description array === //
    return this.eventUpDate.controls['infoArray'] as FormArray;
  }
  // === Return AS ARRAY === /
  ngOnInit() {
    this.routerURL.paramMap.subscribe((res) => {
      this.eventID = res.get('EventID');
      console.log('eventID ::', this.eventID);
      if (this.eventID !== null) {
        this.eventsService
          .eventUpdateID(this.url, this.eventID)
          .subscribe((res: Events) => {
            // this.event = res;
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
    this.eventUpDate.patchValue({
      id: data.id,
      image: data.image,
      imgType: data.imgType,
      active: data.active,
    });
    data.info.forEach((data: AllLanguage) => {
      console.log(data);
      // this.infoArray.removeAt(0);
      this.infoArray.push(this.arrayFormGroup(data.lang, data));
    });
    this.eventUpDate.patchValue({
      infoArray: this.infoArray.value,
    });
  }
  // === Get event Update By ID === //
  // === Get Active Language === //
  eventGetActiveLang() {
    this.languageService.langActive(this.url).subscribe((res) => {
      this.langActive = res;
      this.langActive.forEach((data: Language) => {
        const langID: string = data.id;
        this.infoArray.push(this.arrayFormGroup(langID));
        // console.log('res:', data);
        // console.log('infoArray:', this.eventUpDate.value);
      });
    });
    this.eventUpDate.patchValue({
      infoArray: this.infoArray.value,
    });
    // console.log('infoArray:', this.eventUpDate.value);
    // console.log('langActive:', this.langActive);
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
    this.eventsService.EventsUpdate(this.url, newForm).subscribe((res: any) => {
      if (res === true) {
        this.alertServer.showAlert('Alert.EventNew', '/events');
        console.log('IF everything work well ::', res);
      }
    });
    // this.alertServer.showAlert('Alert.EventNew', '/events');
    // console.log('IF everything work well ::', this.eventUpDate);
    // console.log('IF everything work well ::', res);
  }
}
