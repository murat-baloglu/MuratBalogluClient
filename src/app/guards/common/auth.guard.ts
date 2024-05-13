import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { _isAuthenticated } from '../../services/common/auth.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  const spinnerService = inject(NgxSpinnerService);
  const alertifyService = inject(AlertifyService);
  const router = inject(Router);

  spinnerService.show();

  //otantike değilse bu işlemleri yap
  if (!_isAuthenticated) {
    router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    alertifyService.message("Yetkisiz Erişim. Giriş yapmanız gerekiyor", {
      dismissOthers: true,
      messageType: MessageType.Warning,
      position: Position.TopCenter
    });
  }

  spinnerService.hide();

  return true;
};
