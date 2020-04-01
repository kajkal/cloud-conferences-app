import { Component, OnInit, Input } from "@angular/core";
import { Conference } from "src/app/models/Conference";
import { BookingService } from '../../services/booking/booking.service';
import { BookingList } from '../../models/BookingList';

@Component({
    selector: "app-conference-thumbnail",
    templateUrl: "./conference-thumbnail.component.html",
    styleUrls: ["./conference-thumbnail.component.scss"]
})
export class ConferenceThumbnailComponent implements OnInit {
    @Input() conference: Conference;

    constructor(private bookingService: BookingService) {}

    ngOnInit() {}

    preventNavigation($event) {
        $event.stopPropagation();
        $event.preventDefault();
    }

    getReservedPlacesCount(conference: Conference): number {
        return (
            this.bookingService.bookingList$.value.conferences.get(conference.key) || 0
        );
    }

    handleAdd(conference: Conference) {
        const bookingList: BookingList = this.bookingService.bookingList$
            .value;
        const currentCount = this.getReservedPlacesCount(conference);
        if (currentCount + 1 <= conference.slots) {
            bookingList.conferences.set(conference.key, currentCount + 1);
            this.bookingService.bookingList$.next(bookingList);
        }
    }

    handleSubtract(conference: Conference) {
        const bookingList: BookingList = this.bookingService.bookingList$
            .value;
        const currentCount = this.getReservedPlacesCount(conference);
        if (currentCount - 1 > 0) {
            bookingList.conferences.set(conference.key, currentCount - 1);
            this.bookingService.bookingList$.next(bookingList);
        }
        if (currentCount - 1 === 0) {
            bookingList.conferences.delete(conference.key);
            this.bookingService.bookingList$.next(bookingList);
        }
    }
}
