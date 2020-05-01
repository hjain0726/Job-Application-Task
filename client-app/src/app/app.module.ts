import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

// App Routing Module import
import { AppRoutingModule } from './app-routing.module';

// Components Imports
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserDetailsEditComponent } from './user-details-edit/user-details-edit.component';
import { UsersListComponent } from './users-list/users-list.component';

// Services Imports
import { ConfigService } from './services/config.service';
import { UserService } from './services/user.service';

// Pipes Imports
import { FirstNamePipe } from './pipes/firstnamePipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserRegisterComponent,
    UserDetailsEditComponent,
    UsersListComponent,
    FirstNamePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
  ],
  providers: [
    ConfigService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
