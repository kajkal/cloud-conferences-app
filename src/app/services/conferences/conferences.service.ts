import { Injectable } from "@angular/core";
import { NewConference, Conference } from "../../models/Conference";
import { BehaviorSubject, Observable, of, timer } from "rxjs";
import { delay, filter, find, map, tap } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
    providedIn: "root"
})
export class ConferencesService {
    public conferences$: BehaviorSubject<Conference[]>;

    constructor(private db: AngularFireDatabase) {
        this.conferences$ = new BehaviorSubject<Conference[]>([]);
        this.fetchConferences().subscribe(conferences => {
            // console.log("emiting", conferences);
            this.conferences$.next(conferences as any);
        });
    }

    public fetchConferences(): Observable<Conference[]> {
        return this.db
            .list<Conference>("/conferences")
            .snapshotChanges()
            .pipe(
                map(conferences =>
                    conferences.map(conference => ({
                        key: conference.key,
                        ...conference.payload.val()
                    }))
                )
            );
    }

    private fetchConference(conferenceKey: string) {
        return this.db.object(`/conferences/${conferenceKey}`);
    }

    getConferenceDetails(conferenceKey: string): Observable<Conference> {
        return this.conferences$.pipe(
            filter(conferences => Boolean(conferences && conferences.length)),
            map(conferences => conferences.find(conference => conference.key === conferenceKey))
        );
    }

    addConference(conference: NewConference) {
        return this.db.list("/conferences").push(conference);
    }

    updateConference(conferenceToUpdate: Conference) {
        return this.fetchConference(conferenceToUpdate.key).set(conferenceToUpdate);
    }

    addComment(relatedConference: Conference, comment: ConferenceComment) {
        return this.db.object(`/conferences/${relatedConference.key}/comments`)
            .set([
                ...(relatedConference.comments || []),
                comment,
            ]);
    }

    deleteConference(conferenceToDelete: Conference) {
        return this.fetchConference(conferenceToDelete.key).remove();
    }
}
