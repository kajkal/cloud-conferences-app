import { Component, OnInit } from '@angular/core';
import { ConferencesService } from '../../services/conferences/conferences.service';
import { Conference } from '../../models/Conference';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LayoutService } from '../../services/layout/layout.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
    selector: 'app-conferences',
    templateUrl: './conferences.component.html',
    styleUrls: [ './conferences.component.scss' ],
})
export class ConferencesComponent implements OnInit {

    private filteredConferences$: Observable<Conference[]>;

    filters = {
        searchPhrase: '',
        selectedCities: [],
        selectedCategories: [],
    };

    citySettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'city',
        textField: 'city',
        itemsShowLimit: 2,
        allowSearchFilter: true,
        enableCheckAll: true,
    };

    categoriesSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'name',
        textField: 'name',
        itemsShowLimit: 2,
        allowSearchFilter: true,
        enableCheckAll: true,
    };

    constructor(
        private conferencesService: ConferencesService,
        private categoriesService: CategoriesService,
        private layoutService: LayoutService,
    ) {
    }

    ngOnInit() {
        this.updateFilters();
    }

    updateFilters() {
        this.filteredConferences$ = this.conferencesService.conferences$
            .pipe(
                map(conferences =>
                    conferences
                        .filter(({ name }) => (
                            name
                                .toLowerCase()
                                .includes(this.filters.searchPhrase.toLowerCase())
                        ))
                        .filter(({ category }) => (
                            (this.filters.selectedCategories.length === 0)
                            || this.filters.selectedCategories.map(c => c.name).includes(category)
                        ))
                        .filter(({ city }) => (
                            (this.filters.selectedCities.length === 0)
                            || this.filters.selectedCities.map(c => c.city).includes(city)
                        )),
                ),
            );
    }

    handleSearchFilterKeyUp(event: any) {
        this.filters.searchPhrase = event.target.value;
        this.updateFilters();
    }

}
