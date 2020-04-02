import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Conference } from "../../models/Conference";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConferencesService } from "../../services/conferences/conferences.service";

@Component({
    selector: "app-update-conference",
    templateUrl: "./update-conference.component.html",
    styleUrls: ["./update-conference.component.scss"]
})
export class UpdateConferenceComponent implements OnInit {
    public form: FormGroup;

    constructor(
        private conferenceService: ConferencesService,
        public dialogRef: MatDialogRef<UpdateConferenceComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Conference
    ) {}

    ngOnInit() {
        const {
            name,
            city,
            organizer,
            category,
            contact,
            startDate,
            endDate,
            price,
            slots,
            detailUrl
        } = this.data;

        this.form = new FormGroup({
            name: new FormControl(name, [Validators.required]),
            city: new FormControl(city, [Validators.required]),
            organizer: new FormControl(organizer, [Validators.required]),
            category: new FormControl(organizer, [Validators.required]),
            contact: new FormControl(contact, [Validators.required]),
            startDate: new FormControl(new Date(startDate), [
                Validators.required
            ]),
            endDate: new FormControl(new Date(endDate), [Validators.required]),
            price: new FormControl(price, [Validators.required]),
            slots: new FormControl(slots, [Validators.required]),
            detailUrl: new FormControl(detailUrl, [Validators.required])
        });
    }
    get name() {
        return this.form.get("name");
    }

    get city() {
        return this.form.get("city");
    }

    get organizer() {
        return this.form.get("organizer");
    }
    get contact() {
        return this.form.get("contact");
    }

    get category() {
        return this.form.get("category");
    }

    get startDate() {
        return this.form.get("startDate");
    }

    get endDate() {
        return this.form.get("endDate");
    }

    get price() {
        return this.form.get("price");
    }

    get slots() {
        return this.form.get("slots");
    }

    get detailUrl() {
        return this.form.get("detailUrl");
    }

    async updateConference() {
      const {
        name,
        city,
        organizer,
        contact,
        category,
        startDate,
        endDate,
        price,
        slots,
        detailUrl
    } = this.form.value;

        const updatedConference: Conference = {
            ...this.data,
            name,
            city,
            organizer,
            contact,
            category,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            price,
            slots,
            detailUrl
        };


        await this.conferenceService.updateConference(updatedConference);
        this.dialogRef.close();
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
