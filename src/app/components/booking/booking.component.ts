import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { SelectedConference } from '../../models/Conference';
import { BookingService } from '../../services/booking/booking.service';
import { Router } from '@angular/router';
import { BookingList } from '../../models/BookingList';
import { ConferencesService } from '../../services/conferences/conferences.service';
import { filter, map, tap } from 'rxjs/operators';


@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: [ './booking.component.scss' ],
})
export class BookingComponent implements OnInit {

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
                tap(v => console.log('selectedConferences$', v)),
            );

        this.totalTotalPrice$ = this.selectedConferences$
            .pipe(
                map(selectedConferences => (
                    selectedConferences.reduce((accumulator, selectedConference) => (
                        accumulator + (selectedConference.price * selectedConference.selectedPlacesCount)
                    ), 0)
                )),
            );
    }

    handleCancel() {
        this.bookingService.bookingList$.next(BookingList.emptyBookingList);
        this.router.navigate([ '/conferences' ]);
    }

    handleProceed() {
        this.router.navigate([ '/confirmation' ]);
    }

}
