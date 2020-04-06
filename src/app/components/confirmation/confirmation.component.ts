import { Component, OnInit } from '@angular/core';
import { ConferencesService } from '../../services/conferences/conferences.service';
import { BookingService } from '../../services/booking/booking.service';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { BookingList } from '../../models/BookingList';
import { filter, map } from 'rxjs/operators';
import { SelectedConference } from '../../models/Conference';


@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: [ './confirmation.component.scss' ],
})
export class ConfirmationComponent implements OnInit {

    public selectedConferences$: Observable<SelectedConference[]>;
    public totalTotalPrice$: Observable<number>;

    constructor(
        private conferencesService: ConferencesService,
        private bookingService: BookingService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.selectedConferences$ = combineLatest(this.bookingService.bookingList$, this.conferencesService.conferences$)
            .pipe(
                filter(([ _, conferences ]) => Boolean(conferences.length)),
                map(([ bookingList, conferences ]) => (
                    Array.from(bookingList.conferences.entries())
                        .map(([ conferenceKey, selectedPlacesCount ]) => {
                            const conference = conferences.find(c => c.key === conferenceKey);
                            return conference ? { ...conference, selectedPlacesCount } : undefined;
                        })
                        .filter(Boolean)
                )),
            );

        this.totalTotalPrice$ = this.selectedConferences$
            .pipe(
                map((selectedConferences: SelectedConference[]) => (
                    selectedConferences.reduce((accumulator, selectedConference) => (
                        accumulator + (selectedConference.price * selectedConference.selectedPlacesCount)
                    ), 0)
                )),
            );
    }

    back() {
        this.router.navigate([ '/booking' ]);
    }

    confirm() {
        this.bookingService.bookingList$.next(BookingList.emptyBookingList);
        this.router.navigate([ '/conferences' ]);
    }

}
