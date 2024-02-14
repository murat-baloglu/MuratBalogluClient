import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../services/common/models/contact.service';
import { ContactModel } from '../../../../contracts/models/contact-model';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { TitleAndDetailUrlModel } from '../../../../contracts/models/common/title-and-detail-url-model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  constructor(private contactService: ContactService, private specialityService: SpecialityService) { }

  contact: ContactModel;
  titleAndDetailUrlList: TitleAndDetailUrlModel[];

  getContact() {
    this.contactService.getContact().subscribe({
      next: (data: ContactModel) => {
        this.contact = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  getSpecialityTitlesAndDetailUrls() {
    this.specialityService.getSpecialityTitlesAndDetailUrls().subscribe({
      next: (data: TitleAndDetailUrlModel[]) => {
        this.titleAndDetailUrlList = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getContact();
    this.getSpecialityTitlesAndDetailUrls();
  }

}
