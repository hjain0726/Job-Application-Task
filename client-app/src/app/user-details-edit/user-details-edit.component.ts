import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  userDetailsEditForm: FormGroup

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createDetailsEditForm();
    this.userDetailsEditForm.patchValue(this.userService.userDetailsToBeEdit);
  }

  onEdit() {
    let userId = this.userService.userDetailsToBeEdit.id;
    this.userService.editUserDetails(userId, this.userDetailsEditForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/users']);
    }, (err) => {
      console.log(err);
    });
  }

  createDetailsEditForm() {
    this.userDetailsEditForm = new FormGroup({
      'id': new FormControl(null),
      'firstName': new FormControl(null, [Validators.required]),
      'middleName': new FormControl(null),
      'lastName': new FormControl(null, [Validators.required]),

      'address': new FormGroup({
        'id': new FormControl(null),
        'addrLine1': new FormControl(null, [Validators.required]),
        'addrLine2': new FormControl(null, [Validators.required]),
        'city': new FormControl(null, [Validators.required]),
        'state': new FormControl(null, [Validators.required]),
        'zipCode': new FormControl(null, [Validators.required]),
        'country': new FormControl(null, [Validators.required])
      }),

      'email': new FormControl(null, [Validators.required]),
      'areaCode': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required]),
      'position': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(null, [Validators.required])
    });
  }

}
