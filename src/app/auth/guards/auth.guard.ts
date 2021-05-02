import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  CanLoad, UrlSegment, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor( 
    private authService: AuthService,
    private router: Router
   ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
      return this.authService.isAuthenticated()
        .pipe(
          tap( isAuthenticated => {
            if( !isAuthenticated ) {
              this.router.navigate(['./auth/login']);
            }
          })
        )
    //   if( this.authService.auth.id ) {
    //     console.log('Authenticated by canActivate');
    //     return true;
    //   }
    //   console.log('blocked by canActivate');
    // return false;
  }


  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      return this.authService.isAuthenticated()
        .pipe(
          tap( isAuthenticated => {
            if( !isAuthenticated ) {
              this.router.navigate(['./auth/login']);
            }
          })
        )

      // if ( this.authService.auth.id ) {
      //   console.log('authenticated by guard canLoad')
      //   return true;
      // }
      // console.log('Blocked by guard - canLoad');
      // return false;

    }
  
}
