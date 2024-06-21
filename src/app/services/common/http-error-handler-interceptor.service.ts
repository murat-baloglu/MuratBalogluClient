import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AlertifyService, MessageType, Position } from '../admin/alertify.service';
import { UserAuthService } from './models/user-auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(
    private alertifyService: AlertifyService,
    private userAuthService: UserAuthService,
    private spinnerService: NgxSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.userAuthService.refreshTokenLoginAsync(localStorage.getItem("refreshToken")).then(data => {
            this.spinnerService.hide();

            this.alertifyService.message("Zaman Aşımı. Tekrar yetkilendirildiniz. Lütfen aynı işlemi tekrar deneyiniz.", {
              dismissOthers: true,
              messageType: MessageType.Warning,
              position: Position.TopCenter,
              delay: 6
            });
          });
          break;

        case HttpStatusCode.InternalServerError:
          this.spinnerService.hide();

          this.alertifyService.message(error.error.message, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopCenter,
            delay: 6
          });
          break;

        // default:
        //   this.alertifyService.message("default", {
        //     dismissOthers: true,
        //     messageType: MessageType.Success,
        //     position: Position.BottomCenter
        //   });
        //   break;
      }

      return throwError(() => error);
    }));
  }

}
