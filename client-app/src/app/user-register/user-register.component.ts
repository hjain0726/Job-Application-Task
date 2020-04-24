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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  // To register User
  onRegister() {
    if(this.registerForm.value.middleName==null){
      this.registerForm.value.middleName="NA";
    }
    if(this.registerForm.value.startDate==null){
      this.registerForm.value.startDate="NA";
    }
    if(this.registerForm.value.address.addrLine2==null){
      this.registerForm.value.address.addrLine2="NA";
    }

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
      'firstName': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'middleName': new FormControl(null, [Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),

      'address': new FormGroup({
        'addrLine1': new FormControl(null, [Validators.required]),
        'addrLine2': new FormControl(null),
        'city': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        'state': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        'zipCode': new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        'country': new FormControl(null, [Validators.required])
      }),

      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      'areaCode': new FormControl(null, [
        Validators.required,
        Validators.min(100),
        Validators.max(999)
      ]),
      'phone': new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[0-9]*')
      ]),
      'position': new FormControl(null, [Validators.required]),
      'startDate': new FormControl(null)
    });
  }

  
}
