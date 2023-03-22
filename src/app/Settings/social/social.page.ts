import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// === Services === //
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { UrlService } from 'src/app/Services/Server/url.service';
import { SocialService } from 'src/app/Services/cPanel/social.service';
// === Services === //
// === Models ===== //
import { Facility } from 'src/app/Model/cPanel/facility.model';
import {
  FullSocialMedia,
  SocialMedia,
  defaultSocialMedia,
} from 'src/app/Model/cPanel/social.model';
// === Models ===== //
@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {
  url: string = this.urlService.url;
  imageURL: string = this.url + '/gallery/';
  social!: SocialMedia[]; // === Get SocialMedia as ARRAY
  defaultIMG: any = 'assets/icon/favicon.png';
  // === to get Filses Info === //
  imageSrc: any;
  fileType!: string;
  file!: File;
  // === to get Filses Info === //
  // Group All Form in Facility Info Form === //
  FacilityInfo: FormGroup = this.fb.group({
    // === Facility Form === //
    upFacility: this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      image: [null, [Validators.required]],
      imgType: [null],
    }),
    // === Facility Form === //
    // === Social Media Form === //
    upSocialMedia: this.fb.group({
      social: this.fb.array<SocialMedia>([]),
    }),
    // === Social Media Form === //
  });
  // Group All Form in Facility Info Form === //

  constructor(
    private fb: FormBuilder,
    private urlService: UrlService,
    private socialService: SocialService,
    private alertServer: AlertService
  ) {}
  // === Return AS ARRAY === //
  get socialMedia(): FormArray {
    return this.FacilityInfo.get('upSocialMedia.social') as FormArray;
  }
  // === Return AS ARRAY === //
  async ngOnInit() {
    await this.getSocialMedia();
  }
  // === get all items from Social Media DB === //
  async getSocialMedia() {
    this.socialService.getSocialMedia(this.urlService.url);
    // === get Facility Info === //
    this.socialService.Facility$.subscribe((res: Facility[]) => {
      if (res.length !== 0) {
        // console.log('Facility ::', res);
        res.forEach((data: Facility) => {
          this.FacilityInfo.patchValue({
            upFacility: {
              id: data.id,
              name: data.name,
              image: data.image,
              imgType: data.imgType,
            },
          });
        });
      }
    });
    // === get Facility Info === //
    // === get Social Media === //
    this.socialService.socialMedia$.subscribe((res: SocialMedia[]) => {
      if (res.length !== 0) {
        this.social = res;
        this.social.forEach((data: SocialMedia) => {
          this.socialMedia.push(this.arrayFormGroup(data));
        });
      } else {
        this.social = defaultSocialMedia;
        this.social.forEach((data: SocialMedia) => {
          this.socialMedia.push(this.arrayFormGroup(data));
        });
      }
      this.FacilityInfo.patchValue({
        upSocialMedia: {
          social: this.socialMedia.value,
        },
      });
    });
    // === get Social Media === //
  }
  // === get all items from Social Media DB === //
  // === Form Array === //
  arrayFormGroup(data: SocialMedia): FormGroup {
    return this.fb.group({
      id: [data.id],
      icon: [data.icon],
      link: [data.link],
      active: [data.active],
    });
  }
  // === Form Array === //
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
        this.FacilityInfo.patchValue({
          upFacility: {
            image: this.file,
            imgType: this.fileType,
          },
        });
      } else {
        this.alertServer.errorAlertIMG(
          'Setting.SocialMedia.ERROR.FacilityImageType'
        );
        /**
         * If File that insert Not image
         * return Value to Null
         */
        this.FacilityInfo.patchValue({
          upFacility: {
            image: null,
            imgType: null,
          },
        });
      }
    }
  }
  // === Get / Images || Videos / From UpLodFile === //
  // === Send Update DATA to Server === //
  submitForm() {
    const newForm = new FormData(); // === Because there is a picture I ned FormData()
    /**
     * If there is a picture,
     * it is preferable to send the information separately
     */
    // === Form Data to Send Value === //
    // console.log(this.FacilityInfo.get('upFacility.id')?.value);
    if (this.FacilityInfo.get('upFacility.id')?.value !== null) {
      newForm.append(
        'FacilityID',
        this.FacilityInfo.get('upFacility.id')?.value
      );
    }
    newForm.append(
      'FacilityName',
      this.FacilityInfo.get('upFacility.name')?.value
    );
    newForm.append('File', this.FacilityInfo.get('upFacility.image')?.value);
    newForm.append(
      'FacilityImageType',
      this.FacilityInfo.get('upFacility.imgType')?.value
    );
    newForm.append(
      'upSocialMedia',
      JSON.stringify(this.FacilityInfo.get('upSocialMedia.social')?.value)
    ); // === SocialMedia Group === //
    // === Form Data to Send Value === //
    this.socialService
      .socialMediaUpdate(this.url, newForm)
      .subscribe((res: any) => {
        if (res === true) {
          this.alertServer.showAlert('Alert.UpSocialMedia', '/cpanel');
        }
        // console.log('IF everything work well', res);
      });
  }
  // === Send Update DATA to Server === //
}
