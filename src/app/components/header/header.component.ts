import { Component } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { interval, Observable } from "rxjs";
import { map } from "rxjs/operators";

enum HeaderMode {
    GUEST = "GUEST", // not authorized user
    USER = "USER", // authorized user
    ADMIN = "ADMIN" // authorized user with admin role
}

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
    mode$: Observable<HeaderMode>;
    selectedPlacesCount$: Observable<number>;

    constructor(private authService: AuthService) {
        this.mode$ = authService.authState$.pipe(
            map(authState => {
                if (authState === null) {
                    return HeaderMode.GUEST;
                }
                return authState.isAdmin ? HeaderMode.ADMIN : HeaderMode.USER;
            })
        );
        this.selectedPlacesCount$ = interval(1000); // todo connect with cart service
    }
}
