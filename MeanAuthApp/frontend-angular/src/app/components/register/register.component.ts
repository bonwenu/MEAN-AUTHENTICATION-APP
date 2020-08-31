import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstname: string;
  lastname: string;
  email: string
  username: string;
  password: string;

  constructor(private validator:ValidateService) { }

  ngOnInit() {
  }

  register() {

    const user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Required fields
    if(!this.validator.validateRegister(user)){
      console.log("Please fill in all fields.");
      return false;
    }

    // Validate email
    if(!this.validator.validateEmail(user.email)) {
      console.log("Please use a valid email.");
      return false;
    }
    // Clear fields if successful
    console.log("Registration successful.")
    this.firstname = undefined;
    this.lastname = undefined;
    this.email = undefined;
    this.username = undefined;
    this.password = undefined;

  }

}
