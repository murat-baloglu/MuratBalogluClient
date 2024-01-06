import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpClientService } from '../../../services/common/http-client-service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent {

  constructor(private httpClient: HttpClient, private httpClientService: HttpClientService) {

    // httpClient.get("https://jsonplaceholder.typicode.com/posts").subscribe(datas => console.log(datas))
    // httpClientService.get({fullEndPoint:"https://jsonplaceholder.typicode.com/posts"}).subscribe(datas=>console.log(datas))

    // httpClientService.get({ fullEndPoint: "https://jsonplaceholder.typicode.com/posts" }).subscribe({
    //   next: datas => console.log(datas),
    //   error: error => console.log(error)
    // })

    // const headers = new HttpHeaders()
    //   .set("name", "vedat")
    //   .set("community", "ngakademi");

    // this.httpClient.get("https://jsonplaceholder.typicode.com/posts", { headers: headers })
    //   .subscribe({
    //     next: (data: any) => {
    //       console.log(data.headers.keys)
    //     },
    //     error: error => {
    //       console.log(error)
    //     }
    //   });

    httpClientService

  }

}
