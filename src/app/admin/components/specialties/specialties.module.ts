import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtiesComponent } from './specialties.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SpecialtiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SpecialtiesModule { }
