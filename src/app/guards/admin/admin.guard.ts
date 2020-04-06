import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.authService.authState$
            .pipe(
                map(authState => {
                    if (authState !== null && authState.isAdmin) {
                        return true;
                    }

                    alert('Admin role required');
                    this.router.navigate([ '/sign-in' ]);
                    return false;
                }),
            );
    }

}
