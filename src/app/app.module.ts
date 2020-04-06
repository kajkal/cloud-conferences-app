import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app/app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { ConferencesComponent } from "./components/conferences/conferences.component";
import {
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatGridListModule,
    MatDialogModule,
    MatSidenavModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { environment } from "../environments/environment";
import { LogoutComponent } from "./components/logout/logout.component";
import { HeaderComponent } from "./components/header/header.component";
import { ConferenceThumbnailComponent } from "./components/conference-thumbnail/conference-thumbnail.component";
import { AddConferenceComponent } from "./components/add-conference/add-conference.component";
import { ConferenceComponent } from "./components/conference/conference.component";
import { UpdateConferenceComponent } from "./components/update-conference/update-conference.component";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BookingComponent } from './components/booking/booking.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        ConferencesComponent,
        LogoutComponent,
        HeaderComponent,
        ConferenceThumbnailComponent,
        AddConferenceComponent,
        ConferenceComponent,
        UpdateConferenceComponent,
        BookingComponent,
        ConfirmationComponent,
    ],
    entryComponents: [UpdateConferenceComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatListModule,
        MatSidenavModule,
        HttpClientModule,
        MatProgressBarModule,
        MatMenuModule,
        MatBadgeModule,
        MatTooltipModule,
        MatGridListModule,
        MatDialogModule,
        NgMultiSelectDropDownModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
