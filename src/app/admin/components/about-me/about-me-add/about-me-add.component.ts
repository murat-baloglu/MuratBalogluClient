import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AboutMeService } from '../../../../services/common/models/about-me.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { AboutMeModel } from '../../../../contracts/models/about-me-model';
import { AboutMeAddModel } from '../../../../contracts/models/about-me-add-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-about-me-add',
  templateUrl: './about-me-add.component.html',
  styleUrl: './about-me-add.component.css'
})
export class AboutMeAddComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private aboutMeService: AboutMeService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService,
    private formbuilder: FormBuilder) {

    if (isPlatformBrowser(this.platformId)) {
      import('ckeditor5-custom-build/build/ckeditor').then(e => {
        this.Editor = e.default;
        this.isBrowser = true;
      });
    }

  }

  aboutMe: AboutMeModel;

  public Editor: any;

  public isDisabled = false;

  public isBrowser = false;

  public model = {
    editorData: ''
  }

  public config = {
    placeholder: 'Oluşturmak istediğiniz hakkında içeriğini buraya yazınız. Boş bırakılamaz!'
  }

  aboutMeForm: FormGroup

  createAboutMeForm(): void {
    this.aboutMeForm = this.formbuilder.group({
      ckEditor: [this.aboutMe?.context, Validators.required]
    });
  }

  addAboutMe() {
    const aboutMeAddModel: AboutMeAddModel = new AboutMeAddModel();
    aboutMeAddModel.context = this.aboutMeForm.value.ckEditor;

    if (this.aboutMeForm.valid) {
      this.spinnerService.show();

      this.aboutMeService.addAboutMe(aboutMeAddModel).subscribe({
        next: (data: AboutMeAddModel) => {
          this.spinnerService.hide();

          this.aboutMeForm.value.ckEditor = data.context;

          this.alertifyService.message("Hakkında başarılı bir şekilde oluşturulmuştur.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        },
        error: (error: HttpErrorResponse) => {
          if (error.status != 401) {
            this.spinnerService.hide();

            this.alertifyService.message(error.error, {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.TopRight
            });
          }
        }
      });
    }
    else {
      this.alertifyService.message("Hakkında içeriği boş bırakılamaz.", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter,
        delay: 5
      });
    }

  }

  getAboutMe() {
    this.spinnerService.show();

    this.aboutMeService.getAboutMe().subscribe({
      next: (data: AboutMeModel) => {
        if (data != null) {
          this.aboutMe = data;
          this.createAboutMeForm();
        }

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    });
  }

  ngOnInit(): void {
    this.createAboutMeForm();
    this.getAboutMe();
  }

}
