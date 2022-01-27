import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AutenticacioService } from '../service/autenticacio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private authService: AutenticacioService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.saberSiUsuariHaFetLogIn()?.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['./login']);
        }
      })
    )
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.saberSiUsuariHaFetLogIn()?.pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['./login']);
        }
      })
    )
  }
}
