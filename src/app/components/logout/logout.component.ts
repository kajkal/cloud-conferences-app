import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-logout',
    template: '',
})
export class LogoutComponent implements OnInit {

    constructor(
        private router: Router,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        // TODO clear cart
        this.authService.logout();
        this.router.navigate([ '/sign-in' ], { replaceUrl: true });
    }

}
