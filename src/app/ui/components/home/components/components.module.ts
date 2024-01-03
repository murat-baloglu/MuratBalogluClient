import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSectionComponent } from './carousel-section/carousel-section.component';
import { AboutMeSectionComponent } from './about-me-section/about-me-section.component';
import { SpecialtiesSectionComponent } from './specialties-section/specialties-section.component';
import { BlogsSectionComponent } from './blogs-section/blogs-section.component';
import { PatientCommentsSectionComponent } from './patient-comments-section/patient-comments-section.component';
import { VideosSectionComponent } from './videos-section/videos-section.component';



@NgModule({
  declarations: [
    CarouselSectionComponent,
    AboutMeSectionComponent,
    SpecialtiesSectionComponent,
    BlogsSectionComponent,
    PatientCommentsSectionComponent,
    VideosSectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CarouselSectionComponent,
    AboutMeSectionComponent,
    SpecialtiesSectionComponent,
    BlogsSectionComponent,
    PatientCommentsSectionComponent,
    VideosSectionComponent
  ]
})
export class ComponentsModule { }
