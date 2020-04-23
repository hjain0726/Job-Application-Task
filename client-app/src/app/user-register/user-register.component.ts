import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  // To register User
  onRegister() {
    console.log(this.registerForm.value);
    this.userService.registerUser(this.registerForm.value).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/users'])
    }, (err) => {
      console.log(err);
    });
  }

  // To create Register Form
  createRegisterForm() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'middleName': new FormControl(null),
      'lastName': new FormControl(null, [Validators.required]),

      'address': new FormGroup({
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
