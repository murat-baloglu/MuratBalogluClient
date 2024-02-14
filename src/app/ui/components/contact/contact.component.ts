import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/common/models/contact.service';
import { ContactModel } from '../../../contracts/models/contact-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }

  contact: ContactModel;

  getContact() {
    this.contactService.getContact().subscribe({
      next: (data: ContactModel) => {
        this.contact = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getContact();
  }

}
