import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  Users = [];
  loader: boolean = true;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: []) => {
      this.Users = users;
      this.loader = false;
      console.log(this.Users);
    }, (err) => {
      console.log(err);
      this.loader = false;
    });
  }

  editUserDetail(user: Object) {
    this.userService.userDetailsToBeEdit = user;
    this.router.navigate(['/editUserDetail'])
  }

  deleteUser(userId: number) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.userService.deleteUser(userId).subscribe((res) => {
            swal(res['msg']['message'], {
              icon: "success",
            });
            this.getUsers();
          }, (err) => {
            console.log(err);
          });
        } else {
          swal("Your user record is safe!");
        }
      });
  }

  viewResume(resumeDbPath: string) {
    window.location.href = this.userService.commonApiPath + '/' + resumeDbPath;
  }
}
