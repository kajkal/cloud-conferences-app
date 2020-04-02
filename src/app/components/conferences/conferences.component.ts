import { Component, OnInit } from "@angular/core";
import { ConferencesService } from "../../services/conferences/conferences.service";
import { Conference } from "../../models/Conference";
import { Observable } from "rxjs";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { LayoutService } from "../../services/layout/layout.service";
import { CategoriesService } from "../../services/categories/categories.service";
import { FormControl, FormGroup } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";

@Component({
    selector: "app-conferences",
    templateUrl: "./conferences.component.html",
    styleUrls: ["./conferences.component.scss"]
})
export class ConferencesComponent implements OnInit {
    private filteredConferences$: Observable<Conference[]>;

    filters = {
        searchPhrase: "",
        selectedCities: [],
        selectedCategories: []
    };

    cityList = [];
    citySettings: IDropdownSettings = {
        singleSelection: false,
        idField: "item_id",
        textField: "item_text",
        itemsShowLimit: 2,
        allowSearchFilter: true,
        enableCheckAll: true
    };

    categoriesList = [];
    categoriesSettings: IDropdownSettings = {
        singleSelection: false,
        idField: "item_id",
        textField: "item_text",
        itemsShowLimit: 2,
        allowSearchFilter: true,
        enableCheckAll: true
    };

    constructor(
        private conferencesService: ConferencesService,
        private categoriesService: CategoriesService,
        private layoutService: LayoutService
    ) {}

    ngOnInit() {
        this.filteredConferences$ = this.conferencesService.conferences$;
        this.getCityList();
        this.getCategoriesList();
        this.updateFilters();
    }

    setCities(e) {
        this.updateFilters();
    }

    trimCities(e) {
        this.updateFilters();
    }

    getCityList() {
        this.conferencesService.conferences$.subscribe(conferences => {
            this.cityList = [...new Set(conferences.map(x => x.city))];
        });
    }

    setCategories(e) {
        this.updateFilters();
    }

    trimCategories(e) {
        this.updateFilters();
    }

    getCategoriesList() {
        this.categoriesService
            .getCategories()
            .valueChanges()
            .subscribe(categories => {
                this.categoriesList = [...new Set(categories.map(x => x.name))];
            });
    }

    updateFilters() {
        console.log(this.filters.selectedCategories);
        console.log(this.filters.selectedCities);
        this.filteredConferences$ = this.conferencesService.conferences$.pipe(
            map(conferences =>
                conferences
                    .filter(conference =>
                        conference.name
                            .toLowerCase()
                            .includes(this.filters.searchPhrase.toLowerCase())
                    )
                    .filter(conference => {
                        if (this.filters.selectedCategories.length === 0)
                            return true;
                        return this.filters.selectedCategories.includes(
                            conference.category
                        );
                    })
                    .filter(conference => {
                        if (this.filters.selectedCities.length === 0)
                            return true;
                        return this.filters.selectedCities.includes(conference.city);
                    })
            )
        );
    }

    handleSearchFilterKeyUp(event: any) {
        const searchPhrase = event.target.value;
        this.filters.searchPhrase = searchPhrase;
        this.updateFilters();
    }
}
