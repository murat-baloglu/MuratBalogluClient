import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../../services/common/models/contact.service';
import { ContactModel } from '../../../contracts/models/contact-model';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkingHourService } from '../../../services/common/models/working-hour.service';
import { WorkingHourModel } from '../../../contracts/models/working-hour-model';
import { MailService } from '../../../services/common/mail.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';
import { MailModel } from '../../../contracts/models/mail-model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private workingHourService: WorkingHourService,
    private mailService: MailService,
    private toastrService: CustomToastrService
  ) { }

  contact: ContactModel;
  workingHour: WorkingHourModel

  @ViewChild('contactForm', { static: true }) form!: ElementRef;

  onSubmit(event: Event) {
    event.preventDefault(); // Formun sayfa yenilemesini engelle

    const formElements = this.form.nativeElement.elements;

    // Form verilerini al 1. Yol
    // const formData = {
    //   fullname: formElements['fullname'].value,
    //   email: formElements['email'].value,
    //   phone: formElements['phone'].value,
    //   message: formElements['message'].value
    // };

    // Form verilerini al 2. Yol
    const mailModel: MailModel = new MailModel();
    mailModel.fullname = formElements['fullname'].value;
    mailModel.email = formElements['email'].value;
    mailModel.phone = formElements['phone'].value;
    mailModel.message = formElements['message'].value;

    this.mailService.SendEmailFromContactForm(mailModel).subscribe({
      next: (data: any) => {
        formElements['fullname'].value = '';
        formElements['email'].value = '';
        formElements['phone'].value = '';
        formElements['message'].value = '';

        this.toastrService.message("Mesajınız gönderildi. En kısa sürede dönüş yapılacaktır.", "Teşekkür ederiz", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopCenter,
          timeOut: 6000
        });
      },
      error: (error: HttpErrorResponse) => {
        if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
          this.toastrService.message("Mesaj gönderilemedi. Tekrar deneyiniz.", "Hata!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopCenter,
            timeOut: 6000
          });
        }
      }
    });
  }

  getContact() {
    this.contactService.getContact().subscribe({
      next: (data: ContactModel) => {
        this.contact = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  getWorkingHours() {
    this.workingHourService.getWorkingHours().subscribe({
      next: (data: WorkingHourModel) => {
        this.workingHour = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getContact();
    this.getWorkingHours();
  }

}
