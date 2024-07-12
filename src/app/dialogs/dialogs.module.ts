import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogImageAddDialogComponent } from './blog-image-add-dialog/blog-image-add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { BlogImageListDialogComponent } from './blog-image-list-dialog/blog-image-list-dialog.component';
import { SpecialityImageAddDialogComponent } from './speciality-image-add-dialog/speciality-image-add-dialog.component';
import { SpecialityImageListDialogComponent } from './speciality-image-list-dialog/speciality-image-list-dialog.component';
import { PatientCommentUpdateDialogComponent } from './patient-comment-update-dialog/patient-comment-update-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpecialityCategoryUpdateDialogComponent } from './speciality-category-update-dialog/speciality-category-update-dialog.component';
import { NewsImageAddDialogComponent } from './news-image-add-dialog/news-image-add-dialog.component';
import { NewsUpdateDialogComponent } from './news-update-dialog/news-update-dialog.component';



@NgModule({
  declarations: [
    BlogImageAddDialogComponent,
    FileUploadDialogComponent,
    DeleteDialogComponent,
    BlogImageListDialogComponent,
    SpecialityImageAddDialogComponent,
    SpecialityImageListDialogComponent,
    PatientCommentUpdateDialogComponent,
    SpecialityCategoryUpdateDialogComponent,
    NewsImageAddDialogComponent,
    NewsUpdateDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule,
    ReactiveFormsModule
  ]
})
export class DialogsModule { }
