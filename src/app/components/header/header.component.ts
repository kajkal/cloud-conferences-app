import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookingService } from '../../services/booking/booking.service';


enum HeaderMode {
    GUEST = 'GUEST', // not authorized user
    USER = 'USER', // authorized user
    ADMIN = 'ADMIN', // authorized user with admin role
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent {

    mode$: Observable<HeaderMode>;
    selectedPlacesCount$: Observable<number>;

    constructor(
        private authService: AuthService,
        private bookingService: BookingService,
    ) {
        this.mode$ = authService.authState$
            .pipe(
                map((authState) => {
                    if (authState === null) {
                        return HeaderMode.GUEST;
                    }
                    return (authState.isAdmin) ? HeaderMode.ADMIN : HeaderMode.USER;
                }),
            );
        this.selectedPlacesCount$ = bookingService.bookingList$
            .pipe(
                map((bookingList): number => (
                    Array.from(bookingList.conferences.values())
                        .reduce((accumulator, current) => accumulator + current, 0)
                )),
            );
    }

}
