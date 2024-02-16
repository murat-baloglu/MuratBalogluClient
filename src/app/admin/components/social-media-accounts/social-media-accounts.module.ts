import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialMediaAccountsComponent } from './social-media-accounts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SocialMediaAccountsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SocialMediaAccountsComponent
  ]
})
export class SocialMediaAccountsModule { }
