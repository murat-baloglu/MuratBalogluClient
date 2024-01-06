import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AboutMeComponent } from './ui/components/about-me/about-me.component';
import { AcademicComponent } from './ui/components/academic/academic.component';
import { BlogsComponent } from './ui/components/blogs/blogs.component';
import { BlogsComponent as AdminBlogsComponent } from './admin/components/blogs/blogs.component';
import { ContactComponent } from './ui/components/contact/contact.component';
import { FaqComponent } from './ui/components/faq/faq.component';
import { PatientCommentsComponent } from './ui/components/patient-comments/patient-comments.component';
import { SpecialtiesComponent } from './ui/components/specialties/specialties.component';
import { VideosComponent } from './ui/components/videos/videos.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent as AdminLayoutComponent } from './admin/layout/layout.component';
import { SpecialtiesDetailComponent } from './ui/components/specialties/components/specialties-detail/specialties-detail.component';

const routes: Routes = [
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "", component: DashboardComponent },
      { path: "blogs", component: AdminBlogsComponent }
    ]
  },

  {
    path: "", component: LayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "anasayfa", component: HomeComponent },
      { path: "hakkimda", component: AboutMeComponent },
      { path: "akademik", component: AcademicComponent },
      { path: "blog", component: BlogsComponent },
      { path: "iletisim", component: ContactComponent },
      { path: "sikca-sorulan-sorular", component: FaqComponent },
      { path: "hasta-yorumlari", component: PatientCommentsComponent },
      { path: "uzmanliklarim", component: SpecialtiesComponent },
      { path: "videolar", component: VideosComponent },
      { path: "uzmanliklarim/robotic-diz-ve-kalca-protezi", component: SpecialtiesDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
