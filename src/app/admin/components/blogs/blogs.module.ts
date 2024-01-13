import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [
    BlogsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ],
  exports: [
    BlogsComponent
  ]
})
export class BlogsModule { }
