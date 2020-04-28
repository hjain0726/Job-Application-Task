import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  userDetailsEditForm: FormGroup
  loader:boolean=false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createDetailsEditForm();
    this.userDetailsEditForm.patchValue(this.userService.userDetailsToBeEdit);  
  }

  onEdit() {
    this.loader=true;
    if(this.userDetailsEditForm.value.middleName==""){
      this.userDetailsEditForm.value.middleName="NA";
    }
    if(this.userDetailsEditForm.value.startDate==""){
      this.userDetailsEditForm.value.startDate="NA";
    }

    let userId = this.userService.userDetailsToBeEdit.id;
    this.userService.editUserDetails(userId, this.userDetailsEditForm.value).subscribe((res) => {
      this.loader=false;
      this.router.navigate(['/users']);
      swal("Done", res['msg']['message'], "success");
    }, (err) => {
      this.loader=false;
      console.log(err);
    });
  }

  createDetailsEditForm() {
    this.userDetailsEditForm = new FormGroup({
      'id': new FormControl(null),
      'firstName': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'middleName': new FormControl(null, [Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),

      'address': new FormGroup({
        'id': new FormControl(null),
        'addrLine1': new FormControl(null, [Validators.required]),
        'addrLine2': new FormControl(null,[Validators.required]),
        'city': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        'state': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        'zipCode': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(8)
        ]),
        'country': new FormControl(null, [Validators.required])
      }),

      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      'countryCode': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]),
      'position': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(null),
      'resumeDbPath': new FormControl(null)
    });
  }

}
