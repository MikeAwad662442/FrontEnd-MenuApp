import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
// === Services === //
import { AlertService } from 'src/app/Services/Alert/alert.service';
import { UrlService } from 'src/app/Services/Server/url.service';
import { SocialService } from 'src/app/Services/cPanel/social.service';
// === Services === //
// === Models ===== //
import {
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
  social!: SocialMedia[]; // === Get SocialMedia as ARRAY
  upSocialMedia: FormGroup = this.fb.group({
    social: this.fb.array<SocialMedia>([]),
  });
  constructor(
    private fb: FormBuilder,
    private urlService: UrlService,
    private socialService: SocialService,
    private alertServer: AlertService
  ) {}
  // === Return AS ARRAY === //
  get socialMedia(): FormArray {
    return this.upSocialMedia.get('social') as FormArray;
  }
  // === Return AS ARRAY === //
  ngOnInit() {
    this.getSocialMedia();
  }
  // === get all items from Social Media DB === //
  getSocialMedia() {
    this.socialService
      .socialMediaGetAll(this.url)
      .subscribe((res: SocialMedia[]) => {
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
        this.upSocialMedia.patchValue({
          social: this.socialMedia.value,
        });
      });
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
  // === Send Update DATA to Server === //
  submitForm() {
    const res: SocialMedia[] = this.upSocialMedia.get('social')?.value;
    // console.log(this.upLanguage.get('languages').value);
    this.socialService.socialMediaUpdate(this.url, res).subscribe((e: any) => {
      if (e === true) {
        this.alertServer.showAlert('Alert.UpSocialMedia', '/cpanel');
      }
      // console.log(res);
    });
  }
  // === Send Update DATA to Server === //
}
