import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Conference } from "../../models/Conference";
import { ConferencesService } from "../../services/conferences/conferences.service";
import { BookingService } from "../../services/booking/booking.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BookingList } from "../../models/BookingList";
import { Observable } from "rxjs";
import { retry, tap, map } from "rxjs/operators";
import { AuthService } from "../../services/auth/auth.service";
import { MatDialog } from "@angular/material";
import { UpdateConferenceComponent } from "../update-conference/update-conference.component";

@Component({
    selector: "app-conference",
    templateUrl: "./conference.component.html",
    styleUrls: ["./conference.component.scss"]
})
export class ConferenceComponent implements OnInit {
    public form: FormGroup;
    private inCategoryConferences: Conference[];
    private inCityConferences: Conference[];
    conference$: Observable<Conference>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private conferencesService: ConferencesService,
        private bookingService: BookingService,
        private authService: AuthService,
        public dialog: MatDialog
    ) {}

    ngOnInit() {
        const conferenceKey: string = this.route.snapshot.paramMap.get(
            "conferenceKey"
        );

        this.conferencesService.fetchConferences().subscribe(conferences => {
            this.conference$.subscribe(currentConference => {
                this.inCityConferences = conferences
                    .filter(
                        conference => conference.city === currentConference.city
                    )
                    .slice(0, 5);
            });
        });

        this.conferencesService.fetchConferences().subscribe(conferences => {
            this.conference$.subscribe(currentConference => {
                this.inCategoryConferences = conferences
                    .filter(
                        conference =>
                            conference.category === currentConference.category
                    )
                    .slice(0, 5);
            });
        });

        this.conference$ = this.conferencesService
            .getConferenceDetails(conferenceKey)
            .pipe(
                retry(2),
                tap(conference => {
                    if (!conference) {
                        console.log(
                            `No conference with id ${conferenceKey} found`
                        );
                        alert(`No conference with id ${conferenceKey} found`);
                        this.router.navigate(["/conferences"]);
                    }
                })
            );

        this.form = new FormGroup({
            comment: new FormControl("", [Validators.required])
        });
    }

    preventNavigation($event) {
        $event.stopPropagation();
        $event.preventDefault();
    }

    getReservedPlacesCount(conference: Conference): number {
        return (
            this.bookingService.bookingList$.value.conferences.get(
                conference.key
            ) || 0
        );
    }

    handleAdd(conference: Conference) {
        const bookingList: BookingList = this.bookingService.bookingList$.value;
        const currentCount = this.getReservedPlacesCount(conference);
        if (currentCount + 1 <= conference.slots) {
            bookingList.conferences.set(conference.key, currentCount + 1);
            this.bookingService.bookingList$.next(bookingList);
        }
    }

    handleSubtract(conference: Conference) {
        const bookingList: BookingList = this.bookingService.bookingList$.value;
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

    async handleRemove(conference: Conference) {
        try {
            // navigate to conferences
            this.router.navigate(["/conferences"]);

            await this.conferencesService.deleteConference(conference);

            // remove from cart
            const bookingList: BookingList = this.bookingService.bookingList$
                .value;
            bookingList.conferences.delete(conference.key);
            this.bookingService.bookingList$.next(bookingList);
        } catch (e) {
            console.log("Conference remove error", e);
        }
    }

    handleOpenUpdateConferenceDialog(conference: Conference) {
        this.dialog.open(UpdateConferenceComponent, {
            data: conference
        });
    }

    get comment() {
        return this.form.get("comment");
    }

    async addComment(conference: Conference) {
        console.log("addComment", this.form.value);

        try {
            await this.conferencesService.updateConference({
                ...conference,
                comments: [
                    ...(conference.comments || []),
                    {
                        timestamp: new Date().toISOString(),
                        author: this.authService.user.email,
                        content: this.form.value.comment
                    }
                ]
            });
            this.comment.setValue("");
            this.comment.setErrors(null);
        } catch (e) {
            console.log("Add comment error", e);
        }
    }
}
