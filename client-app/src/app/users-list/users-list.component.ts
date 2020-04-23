import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  Users = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: []) => {
      this.Users = users;
      console.log(this.Users);
    }, (err) => {
      console.log(err);
    });
  }

  editUserDetail(user: Object) {
    this.userService.userDetailsToBeEdit = user;
    this.router.navigate(['/editUserDetail'])
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe((res) => {
      console.log(res);
      this.getUsers();
    }, (err) => {
      console.log(err);
    });
  }
}
