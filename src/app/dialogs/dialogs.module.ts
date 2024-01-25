import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogImageAddDialogComponent } from './blog-image-add-dialog/blog-image-add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';



@NgModule({
  declarations: [
    BlogImageAddDialogComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule
  ]
})
export class DialogsModule { }
