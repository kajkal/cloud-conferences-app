import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Category } from '../../models/Category';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class CategoriesService {

    public categories$: BehaviorSubject<Category[]>;

    constructor(private db: AngularFireDatabase) {
        this.categories$ = new BehaviorSubject([]);
        this.fetchCategories()
            .valueChanges()
            .subscribe(value => this.categories$.next(value));
    }

    private fetchCategories() {
        return this.db.list<Category>('/categories');
    }

}
