import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from './guards/not-auth/not-auth.guard';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AddConferenceComponent } from './components/add-conference/add-conference.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { BookingComponent } from './components/booking/booking.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/sign-in',
        pathMatch: 'full',
    },
    {
        path: 'sign-in',
        canActivate: [ NotAuthGuard ],
        component: SignInComponent,
    },
    {
        path: 'logout',
        component: LogoutComponent,
    },
    {
        path: 'conferences',
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                component: ConferencesComponent,
            },
            {
                path: ':conferenceKey',
                component: ConferenceComponent,
            },
        ],
    },
    {
        path: 'booking',
        canActivate: [ AuthGuard ],
        component: BookingComponent,
    },
    {
        path: 'confirmation',
        canActivate: [ AuthGuard ],
        component: ConfirmationComponent,
    },
    {
        path: 'admin',
        canActivate: [ AdminGuard ],
        children: [
            {
                path: 'new-conference',
                component: AddConferenceComponent,
            },
        ],
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {
}
