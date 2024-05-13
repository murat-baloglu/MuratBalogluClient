import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { User } from '../../../entities/user';
import { Observable } from 'rxjs';
import { CreateUserResponse } from '../../../contracts/user/create-user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  createUser(user: User): Observable<CreateUserResponse> {
    return this.httpClientService.post<CreateUserResponse>({ controller: "users" }, user);
  }

}
