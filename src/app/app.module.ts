import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter(): Promise<string | null> {
  return Promise.resolve().then(() => localStorage.getItem("accessToken"));
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        //Bu kütüphaneye diyorumki bak kardeşim benim mimaride kullandığım token budur. Sen bunu al. Bütün isteklerde bu token ı
        //authorization olarak header a yerleştir. Araya interceptor olarak sen bunu değerlendir.
        //Bununla dışında birde hedef sunucuyuda belirtmem gerekir.
        tokenGetter: tokenGetter,
        allowedDomains: ["drmuratbaloglu.com", "localhost:7015"]
        // allowedDomains: ["drmuratbaloglu.com"]
      }
    })
  ],
  providers: [
    provideClientHydration(),
    { provide: "baseUrl", useValue: "https://localhost:7015/api", multi: true } //Localde çalışırken bu end pointi kullan.
    // { provide: "baseUrl", useValue: "https://drmuratbaloglu.com/api", multi: true } //Production(canlıda) bu end pointi kullan.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
