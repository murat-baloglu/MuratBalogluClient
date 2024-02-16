import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../services/common/models/contact.service';
import { ContactModel } from '../../../../contracts/models/contact-model';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialMediaAccountService } from '../../../../services/common/models/social-media-account.service';
import { SocialMediaAccountModel } from '../../../../contracts/models/social-media-account-model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private contactService: ContactService, private socialMediaAccountService: SocialMediaAccountService) { }

  contact: ContactModel;
  socialMediaAccount: SocialMediaAccountModel;

  getContact() {
    this.contactService.getContact().subscribe({
      next: (data: ContactModel) => {
        this.contact = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  getSocialMediaAccounts() {
    this.socialMediaAccountService.getSocialMediaAccounts().subscribe({
      next: (data: SocialMediaAccountModel) => {
        this.socialMediaAccount = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getContact();
    this.getSocialMediaAccounts();
  }

}
