import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BookingList } from "../../models/BookingList";

@Injectable({
    providedIn: "root"
})
export class BookingService {
    public bookingList$: BehaviorSubject<BookingList>;

    constructor() {
        this.bookingList$ = new BehaviorSubject<BookingList>(
            BookingService.getBookingListFromMemory()
        );
        this.bookingList$.subscribe(BookingService.saveBookingListInMemory);
    }

    private static getBookingListFromMemory(): BookingList {
        const bookingListFromMemory: string | null = localStorage.getItem(
            "BookingList"
        );
        return bookingListFromMemory
            ? BookingList.fromJSON(bookingListFromMemory)
            : BookingList.emptyBookingList;
    }

    private static saveBookingListInMemory(bookingList: BookingList): void {
        localStorage.setItem("BookingList", bookingList.toJSON());
    }
}
