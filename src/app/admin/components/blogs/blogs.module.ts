import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';
// import { FileUploadModule } from '../../../services/common/file-upload/file-upload.module';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ModalsModule } from '../../../modals/modals.module';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BlogAddComponent,
    BlogListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    RouterModule,
    // FileUploadModule,
    //ModalsModule,
    DialogModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class BlogsModule { }
