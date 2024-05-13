import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateUserResponse } from '../../../contracts/user/create-user-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService
  ) { }

  registerForm: FormGroup;
  submitted: boolean;

  createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email, Validators.maxLength(250)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      passwordConfirmed: ["", [Validators.required]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let password = group.get("password").value;
        let passwordConfirmed = group.get("passwordConfirmed").value;
        return password === passwordConfirmed ? null : { notSame: true }
      }
    });
  }

  //Bu bir property idir. component.controlName şeklinde kullanılır. Kullanabilmek için; "noPropertyAccessFromIndexSignature": false yapıldı.
  get component() {
    return this.registerForm.controls;
  }

  onSubmit(user: User) {
    this.submitted = true;
    if (this.registerForm.invalid)
      return;

    this.spinnerService.show();

    this.userService.createUser(user).subscribe({
      next: (data: CreateUserResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(data.message, {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopCenter,
          delay: 7
        });
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error.message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopCenter
        });
      }
    });

  }

  ngOnInit(): void {
    this.createRegisterForm();
  }
}
