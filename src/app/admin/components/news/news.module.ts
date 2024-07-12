import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from '../news/news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewsComponent
  ],
  imports: [
    CommonModule,
    // RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // DialogsModule,
    // MatDialogModule,
    // MatButtonModule
  ]
})
export class NewsModule { }
