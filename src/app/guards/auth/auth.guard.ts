import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    /**
     * Guard requires from user to be authenticated.
     * Navigate to sign in page ('/sign-in') when user is not authenticated.
     */
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.authService.authState$
            .pipe(
                map(authState => {
                    if (authState !== null) {
                        return true;
                    }

                    this.router.navigate([ '/sign-in' ]);
                    return false;
                }),
            );
    }

}
