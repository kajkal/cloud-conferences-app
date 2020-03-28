import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';


@Injectable({
    providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    /**
     * Guard requires from user to be NOT authenticated.
     * Navigate to home page ('/conferences') when user is already authenticated.
     */
    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.authService.authState$
            .pipe(
                map(authState => {
                    if (authState === null) {
                        return true;
                    }

                    this.router.navigate([ '/conferences' ]);
                    return false;
                }),
            );
    }

}
