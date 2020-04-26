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
  loader: boolean = false;

  pageNumber: number = 1;
  pageCount: number = 2;
  totalUsersInDb: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsersPerPage();
  }

  getUsersPerPage() {
    this.loader = true;
    this.userService.getUsersPerPage(this.pageNumber, this.pageCount).subscribe((res) => {
      this.Users = res['users'];
      this.totalUsersInDb = res['totalUsersInDb'];
      this.loader = false;
    }, (err) => {
      console.log(err);
      this.loader = false;
    });
  }

  onPageChange(pageNumber) {
    this.pageNumber = pageNumber;
    this.getUsersPerPage();
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
            if (this.Users.length == 1 && this.pageNumber != 1) {
              this.pageNumber = this.pageNumber - 1;
            }
            this.getUsersPerPage();
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
