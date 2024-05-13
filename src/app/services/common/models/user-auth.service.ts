import { Injectable, OnInit } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { TokenResponse } from '../../../contracts/token/token-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService) { }

  login(userNameOrEmail: string, password: string): Observable<TokenResponse> {
    return this.httpClientService.post<TokenResponse>({ controller: "auth", action: "login" }, { userNameOrEmail, password });
  }

}
