import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    { provide: "baseUrl", useValue: "https://localhost:7070/api", multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
