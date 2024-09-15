import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { MailModel } from '../../contracts/models/mail-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClientService: HttpClientService) { }

  SendEmailFromContactForm(mailModel: MailModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "contacts", action: "send-email" }, mailModel);
  }
}
