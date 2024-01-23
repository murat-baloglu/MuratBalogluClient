import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { BlogService } from '../../../../services/common/models/blog.service';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileUploadOptions } from '../../../../services/common/file-upload/file-upload.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogAddModel } from '../../../../contracts/models/blog-add-model';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.css'
})
export class BlogAddComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private blogService: BlogService,
    private alertify: AlertifyService,
    private formbuilder: FormBuilder) {

    if (isPlatformBrowser(this.platformId)) {
      import('ckeditor5-custom-build/build/ckeditor').then(e => {
        this.Editor = e.default;
        this.isBrowser = true;
      });
    }

  }

  ngOnInit(): void {
    this.createBlogForm();
  }

  // @Output() fileUploadOptions: Partial<FileUploadOptions> = {
  //   controller: "blogs",
  //   action: "upload",
  //   explanation: "Blog kartı için bir adet resim seçiniz veya sürükleyip bırakınız.",
  //   accept: ".png, .jpg, jpeg, .gif",
  //   multiple: false
  // };

  public Editor: any;

  public isDisabled = false;

  public isBrowser = false;

  public model = {
    editorData: ''
  }

  public config = {
    placeholder: 'Oluşturmak istediğiniz blog içeriğini buraya yazınız!'
  }

  blogForm: FormGroup

  createBlogForm(): void {
    this.blogForm = this.formbuilder.group({
      title: ["", Validators.required],
      cardContext: ["", [
        Validators.required,
        Validators.minLength(50)
      ]]
    });
  }

  addBlog() {
    const blogAddModel: BlogAddModel = new BlogAddModel();
    blogAddModel.title = this.blogForm.value.title;
    blogAddModel.cardContext = this.blogForm.value.cardContext;
    blogAddModel.context = this.model.editorData;

    this.blogService.addBlog(blogAddModel).subscribe({
      next: (data: any) => {
        this.alertify.message("Başarı ile olusturulmustur.", {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        });
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.alertify.message(error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
        console.log(error.message);
      }
    });

  }

}
