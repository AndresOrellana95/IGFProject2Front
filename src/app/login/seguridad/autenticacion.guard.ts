import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import { ServicioAutenticacion } from './../servicios';

@Injectable()
export class AutenticacionGuard implements CanActivate {
  constructor(private router: Router,
    private cookieService: CookieService,
    private authService: ServicioAutenticacion
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let res = false;
    let token = this.cookieService.get('token');

    if (!token) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    else {
      let user = this.cookieService.getObject('usuario');

      if (!user) {
          this.cookieService.remove('token');
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      }

      if(user){
        let i = user['policies'].includes(next.data['politica']);
        if(i == false) this.router.navigate(['/login']);
        else res = true;
      }
    }

    return res;
  }
}
