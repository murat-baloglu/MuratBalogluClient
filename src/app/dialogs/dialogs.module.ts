import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogImageAddDialogComponent } from './blog-image-add-dialog/blog-image-add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadModule } from '../services/common/file-upload/file-upload.module';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { BlogImageListDialogComponent } from './blog-image-list-dialog/blog-image-list-dialog.component';



@NgModule({
  declarations: [
    BlogImageAddDialogComponent,
    FileUploadDialogComponent,
    DeleteDialogComponent,
    BlogImageListDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FileUploadModule
  ]
})
export class DialogsModule { }
