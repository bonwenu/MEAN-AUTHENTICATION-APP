import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private validator:ValidateService, 
              private flashMessage: FlashMessagesService, 
              private authurizor: AuthService,
              private router:Router) { }

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
      this.flashMessage.show("Please fill in all fields.", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate email
    if(!this.validator.validateEmail(user.email)) {
      this.flashMessage.show("Please use a valid email.", {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // Clear fields if successful
    console.log("Registration successful.")
    this.firstname = undefined;
    this.lastname = undefined;
    this.email = undefined;
    this.username = undefined;
    this.password = undefined;

    // Register user
    this.authurizor.registerUser(user).subscribe((data:any) => {
      if(data.success) {
        this.flashMessage.show("You are now registered and can log in.", {cssClass: 'alert-success', timeout: 3000});
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 3000);
        
      }
      else {
        this.flashMessage.show("Something went wrong.", {cssClass: 'alert-danger', timeout: 3000});
      }
    });
  }

  


}
