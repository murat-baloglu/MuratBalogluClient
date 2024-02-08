import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';
import { LayoutComponent as AdminLayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { AboutMeComponent } from './ui/components/about-me/about-me.component';
import { AboutMeComponent as AdminAboutMeComponent } from './admin/components/about-me/about-me.component';
import { AcademicComponent } from './ui/components/academic/academic.component';
import { BlogsComponent } from './ui/components/blogs/blogs.component';
// import { BlogsComponent as AdminBlogsComponent } from './admin/components/blogs/blogs.component';
import { VideosComponent as AdminVideosComponent } from './admin/components/videos/videos.component';
import { ContactComponent } from './ui/components/contact/contact.component';
import { ContactComponent as AdminContactComponent } from './admin/components/contact/contact.component';
import { FaqComponent } from './ui/components/faq/faq.component';
import { FaqComponent as AdminFaqComponent } from './admin/components/faq/faq.component';
import { PatientCommentsComponent } from './ui/components/patient-comments/patient-comments.component';
import { SpecialtiesComponent } from './ui/components/specialties/specialties.component';
import { VideosComponent } from './ui/components/videos/videos.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { SpecialtiesDetailComponent } from './ui/components/specialties/components/specialties-detail/specialties-detail.component';
import { BlogsDetailComponent } from './ui/components/blogs/components/blogs-detail/blogs-detail.component';
import { LanguagesComponent as AdminLanguagesComponent } from './admin/components/languages/languages.component';
import { BlogAddComponent } from './admin/components/blogs/blog-add/blog-add.component';
import { BlogListComponent } from './admin/components/blogs/blog-list/blog-list.component';
import { SpecialityAddComponent } from './admin/components/specialties/speciality-add/speciality-add.component';
import { SpecialityListComponent } from './admin/components/specialties/speciality-list/speciality-list.component';

const routes: Routes = [
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "", component: DashboardComponent }, //DashboardComponent burada Ui daki HomeComponent kontrolü için kullanılıyor.
      { path: "blog-add", component: BlogAddComponent },
      { path: "blog-list", component: BlogListComponent },
      { path: "speciality-add", component: SpecialityAddComponent },
      { path: "speciality-list", component: SpecialityListComponent },
      { path: "about-me", component: AdminAboutMeComponent },
      { path: "contact", component: AdminContactComponent },
      { path: "faq", component: AdminFaqComponent },
      { path: "languages", component: AdminLanguagesComponent },
      { path: "videos", component: AdminVideosComponent }
    ]
  },

  {
    path: "", component: LayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "anasayfa", component: HomeComponent },
      { path: "hakkimda", component: AboutMeComponent },
      { path: "akademik", component: AcademicComponent },
      { path: "bloglar", component: BlogsComponent },
      { path: "blog/:detailUrl", component: BlogsDetailComponent },
      { path: "iletisim", component: ContactComponent },
      { path: "sikca-sorulan-sorular", component: FaqComponent },
      { path: "hasta-yorumlari", component: PatientCommentsComponent },
      { path: "uzmanliklarim", component: SpecialtiesComponent },
      { path: "uzmanlik/:detailUrl", component: SpecialtiesDetailComponent },
      { path: "videolar", component: VideosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
