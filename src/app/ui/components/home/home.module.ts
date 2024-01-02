import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { AcademicComponent } from '../academic/academic.component';
import { AboutMeComponent } from '../about-me/about-me.component';
import { VideosComponent } from '../videos/videos.component';
import { SpecialtiesComponent } from '../specialties/specialties.component';
import { PatientCommentsComponent } from '../patient-comments/patient-comments.component';
import { FaqComponent } from '../faq/faq.component';
import { ContactComponent } from '../contact/contact.component';
import { CarouselComponent } from '../carousel/carousel.component';
import { BlogsComponent } from '../blogs/blogs.component';



@NgModule({
  declarations: [
    HomeComponent,
    AboutMeComponent,
    AcademicComponent,
    BlogsComponent,
    CarouselComponent,
    ContactComponent,
    FaqComponent,
    PatientCommentsComponent,
    SpecialtiesComponent,
    VideosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    AboutMeComponent,
    AcademicComponent,
    BlogsComponent,
    CarouselComponent,
    ContactComponent,
    FaqComponent,
    PatientCommentsComponent,
    SpecialtiesComponent,
    VideosComponent
  ]
})
export class HomeModule { }
