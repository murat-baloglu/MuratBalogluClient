import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserAuthService } from '../../../services/common/models/user-auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenResponse } from '../../../contracts/token/token-response';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userAuthService: UserAuthService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertifyService: AlertifyService,
    private spinnerService: NgxSpinnerService
  ) { }

  loginForm: FormGroup;
  submitted: boolean;

  createLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userNameOrEmail: ["", [Validators.required, Validators.email, Validators.maxLength(250)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    });
  }

  //Bu bir property idir. component.controlName şeklinde kullanılır. Kullanabilmek için; "noPropertyAccessFromIndexSignature": false yapıldı.
  get component() {
    return this.loginForm.controls;
  }


  login(data: { userNameOrEmail, password }) {
    this.submitted = true;
    if (this.loginForm.invalid)
      return;

    this.spinnerService.show();

    this.userAuthService.login(data.userNameOrEmail, data.password).subscribe({
      next: (data: TokenResponse) => {
        if (data) {
          localStorage.setItem("accessToken", data.token.accessToken);

          this.spinnerService.hide();

          this.alertifyService.message("Giriş başarılı. Hoşgeldiniz. İyi çalışmalar.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopCenter
          });
        }

        this.authService.identityCheck();

        //Eğer login olurken bir query string varsa, login olduktan sonra o sayfaya gidebilmek için query parametresini elde ederiz ve oraya gideriz.
        this.activatedRoute.queryParams.subscribe(params => {
          const returnUrl: string = params["returnUrl"];
          if (returnUrl) {
            this.router.navigate([returnUrl]);
          }
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
    this.createLoginForm();
  }

}
