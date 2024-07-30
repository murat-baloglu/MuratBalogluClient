import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Menu } from '../../../contracts/application-configurations/menu';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private httpClientService: HttpClientService) { }

  async getAuthorizeDefinitionEndpointsAsync(): Promise<Menu[]> {
    const observable: Observable<Menu[]> = this.httpClientService.get<Menu[]>({
      controller: "applicationservices"
    });

    return await firstValueFrom(observable);
  }
}
