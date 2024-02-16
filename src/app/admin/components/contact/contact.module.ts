import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialMediaAccountsModule } from '../social-media-accounts/social-media-accounts.module';
import { WorkingHoursModule } from '../working-hours/working-hours.module';



@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SocialMediaAccountsModule,
    WorkingHoursModule
  ]
})
export class ContactModule { }
