import { Component, OnInit } from "@angular/core";
import { ConferencesService } from "../../services/conferences/conferences.service";
import { Conference } from "../../models/Conference";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { LayoutService } from "../../services/layout/layout.service";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-conferences",
    templateUrl: "./conferences.component.html",
    styleUrls: ["./conferences.component.scss"]
})
export class ConferencesComponent implements OnInit {
    private filteredConferences$: Observable<Conference[]>;

    filters = {
        price: {
            min: 0,
            max: 0
        },
        searchPhrase: /.*/
    };

    constructor(
        private conferencesService: ConferencesService,
        private layoutService: LayoutService
    ) {}

    ngOnInit() {

            this.conferencesService.conferences$
                .pipe(
                    map(conferences =>
                        conferences.map(conference => conference.price)
                    ),
                    map(prices => ({
                        floor: prices.length ? Math.min(...prices) : 0,
                        ceil: prices.length ? Math.max(...prices) : 0
                    })),
                    distinctUntilChanged(
                        (a, b) => a.floor === b.floor && a.ceil === b.ceil
                    )
                )
                .subscribe(({ floor, ceil }) => {
                    const { min, max } = this.filters.price;
                    let updateFilters = false;

                    if (min < floor || min > ceil) {
                        this.filters.price.min = floor;
                        updateFilters = true;
                    }

                    if (max < floor || max > ceil) {
                        this.filters.price.max = ceil;
                        updateFilters = true;
                    }

                    if (updateFilters) {
                        this.updateFilters();
                    }
                });

        this.filteredConferences$ = this.conferencesService.conferences$;
    }

    private updateFilters() {
        this.filters = { ...this.filters };
        this.filteredConferences$ = this.conferencesService.conferences$.pipe(
            map(conferences =>
                conferences
                    .filter(conference =>
                        this.filters.searchPhrase.test(
                            conference.name.toLowerCase()
                        )
                    )
                    .filter(
                        conference =>
                            conference.price >= this.filters.price.min &&
                            conference.price <= this.filters.price.max
                    )
            )
            // tap(console.log),
        );
    }

    // handlePriceFilterChange(changeContext: ChangeContext) {
    //     console.log('handlePriceFilter', { min: changeContext.value, max: changeContext.highValue });

    //     this.filters.price = {
    //         min: changeContext.value,
    //         max: changeContext.highValue,
    //     };
    //     this.updateFilters();
    // }

    handleSearchFilterKeyUp(event: any) {
        const searchPhrase = event.target.value;
        this.filters.searchPhrase = new RegExp(
            ["", ...searchPhrase.toLowerCase()].map(c => `${c}.*`).join("")
        );
        this.updateFilters();
    }
}
