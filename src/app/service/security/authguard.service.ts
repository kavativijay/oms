import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private authService:AuthService, private router:Router) {

  }

  canActivate(route:ActivatedRouteSnapshot,
              state:RouterStateSnapshot):Observable<boolean> {

                  return this.authService.authStateObservable()
                  .take(1)
                  .map(user => !!user)
                  .do(loggedIn => {
                    if (!loggedIn) {
                      this.router.navigate(['/login']);
                    }
                });
       
  }
}
