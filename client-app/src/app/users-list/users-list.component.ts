import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services Imports
import { UserService } from '../services/user.service';

// To use sweet alerts
declare var swal: any;

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  Users = [];
  loader: boolean = false;
  searchText: string;
  pageNumber: number;
  pageCount: number = 2; // We want two records per page 
  totalUsersInDb: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.pageNumber = this.userService.currentPage; // to initialize page number from service current page
    // It will get users acc. to page number
    this.getUsersPerPage();
  }

  // To get users per page
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

  // To get page number on change of page
  onPageChange(pageNumber) {
    this.pageNumber = pageNumber;
    // calling getUsersPerPage on change of every page to get per page records
    this.getUsersPerPage();
  }

  // To get All Users At once
  getUsers() {
    this.userService.getUsers().subscribe((users: []) => {
      this.Users = users;
      this.loader = false;
    }, (err) => {
      console.log(err);
      this.loader = false;
    });
  }

  // To set user in service whose detail to be edit and navigate to editUserDeatil component
  editUserDetail(user: Object) {
    // Setting on page number because we want to be on same page where record is present after edit
    this.userService.currentPage = this.pageNumber;
    // Setting user in service
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
              this.pageNumber = this.pageNumber - 1; // bcz if that page have no records after delete than we go to prev page
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

  // To get static resume file from server
  viewResume(resumeDbPath: string) {
    window.location.href = this.userService.commonApiPath + '/' + resumeDbPath;
  }

}
