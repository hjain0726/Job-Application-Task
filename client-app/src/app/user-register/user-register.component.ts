import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services Imports
import { UserService } from '../services/user.service';

// To use Sweet alerts
declare var swal: any;

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registerForm: FormGroup;
  loader: boolean = false;
  selectedFile: File;
  fileErrorMsg;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // To create register form
    this.createRegisterForm();
  }

  // To get selected File
  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0]; // selected file
    //To Check file type and size 
    this.requiredFileType();
  }

  // To check file type and size
  requiredFileType() {
    // To get file extension by finding last dot and get string after it i.e file extension
    const extension = this.selectedFile.name.substring(this.selectedFile.name.lastIndexOf(".") + 1)
    if (extension != 'pdf' && extension != 'docx') {
      this.fileErrorMsg = "File should be in pdf or docx format"
    } else if (Math.round(this.selectedFile.size / 1024) > 500) {
      this.fileErrorMsg = "File size should be less than or equal to 500KB"
    } else {
      this.fileErrorMsg = null;
    }
  }

  // To upload resume file and call register function
  uploadAndRegister() {
    this.loader = true;

    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name); // append file to form data

    // Calling service function to upload file
    this.userService.uploadResume(fd).subscribe((res) => {
      if (res['dbPath'] != null) {
        this.registerForm.value.resumeDbPath = res['dbPath'];
        // Call registerUser function to submit user details
        this.registerUser();
      }
    }, (err) => {
      this.loader = false;
      console.log(err);
      swal("Sorry!!", 'Resume Not Uploaded');
    });
  }

  // To register User
  registerUser() {
    // to set current page equal to one bcz after register we want to go to first page of users list
    this.userService.currentPage = 1;

    // To check not required fields are empty or not
    if (this.registerForm.value.middleName == "") {
      this.registerForm.value.middleName = "NA";
    }
    if (this.registerForm.value.startDate == "") {
      this.registerForm.value.startDate = "NA";
    }

    // Call service function to register
    this.userService.registerUser(this.registerForm.value).subscribe((res) => {
      this.loader = false;
      if (res['msg']['success']) {
        this.router.navigate(['/users'])
        swal("Done", res['msg']['message'], "success");
      } else if (!res['msg']['success']) {
        swal("Sorry!!", res['msg']['message']);
      }
    }, (err) => {
      this.loader = false;
      console.log(err);
    });
  }

  // To reset the form
  resetForm() {
    this.registerForm.reset();
    this.fileErrorMsg = null;
  }

  // To create Register Form
  createRegisterForm() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      'middleName': new FormControl(null, [Validators.pattern('[a-zA-Z ]*')]),
      'lastName': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),

      'address': new FormGroup({
        'addrLine1': new FormControl(null, [Validators.required]),
        'addrLine2': new FormControl(null, [Validators.required]),
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
      'resumeDbPath': new FormControl(null),
      'resumeFile': new FormControl(null, [Validators.required])
    });
  }

}
