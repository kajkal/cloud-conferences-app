import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ConferencesService } from "../../services/conferences/conferences.service";
import { NewConference } from "../../models/Conference";
import { Router } from "@angular/router";

@Component({
    selector: "app-add-conference",
    templateUrl: "./add-conference.component.html",
    styleUrls: ["./add-conference.component.scss"]
})
export class AddConferenceComponent implements OnInit {
    public form: FormGroup;

    constructor(
        private conferencesService: ConferencesService,
        private router: Router
    ) {}

    ngOnInit() {
        this.form = new FormGroup({
            name: new FormControl("", [Validators.required]),
            city: new FormControl("", [Validators.required]),
            organizer: new FormControl("", [Validators.required]),
            contact: new FormControl("", [Validators.required]),
            category: new FormControl("", [Validators.required]),
            startDate: new FormControl(new Date(), [Validators.required]),
            endDate: new FormControl(new Date(), [Validators.required]),
            price: new FormControl("", [Validators.required]),
            slots: new FormControl("", [Validators.required]),
            detailUrl: new FormControl("", [Validators.required])
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

    async createConference() {
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

        const newConference: NewConference = {
            name,
            city,
            organizer,
            contact,
            category,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
            price,
            slots,
            detailUrl,
            comments: []
        };

        console.log("createConference", {
            form: this.form.value,
            newConference
        });
        await this.conferencesService.addConference(newConference);
        this.router.navigate(["/conferences"]);
    }
}
