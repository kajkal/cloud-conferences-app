import { Component, OnInit, Input } from "@angular/core";
import { Conference } from "src/app/models/Conference";

@Component({
    selector: "app-conference-thumbnail",
    templateUrl: "./conference-thumbnail.component.html",
    styleUrls: ["./conference-thumbnail.component.scss"]
})
export class ConferenceThumbnailComponent implements OnInit {
    @Input() conference: Conference;

    constructor() {}

    ngOnInit() {}
}
