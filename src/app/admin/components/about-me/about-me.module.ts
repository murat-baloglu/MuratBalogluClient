import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './about-me.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AboutMeModule { }
