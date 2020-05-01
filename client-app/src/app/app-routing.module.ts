import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components imports
import { UserRegisterComponent } from './user-register/user-register.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsEditComponent } from './user-details-edit/user-details-edit.component';

const appRoutes: Routes = [
    { path: 'register', component: UserRegisterComponent },
    { path: 'users', component: UsersListComponent },
    { path: 'editUserDetail', component: UserDetailsEditComponent },
    { path: '**', redirectTo: '/register' }
];

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})
export class AppRoutingModule {

}