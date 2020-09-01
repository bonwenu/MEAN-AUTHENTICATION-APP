import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string = '';
  password:string = '';

  constructor(private authorizor: AuthService,
              private flashMessage:FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
    if(this.authorizor.loggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  checkLogin() {

    console.log("Login clicked.");

    const user = {
      username: this.username,
      password: this.password
    }

    this.authorizor.authenticatedUser(user).subscribe((data:any) => {
      if(data.success) {
        this.authorizor.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in!', {
          cssClass: 'alert-success', 
          timeout: 3500});
        this.router.navigate(['dashboard']);
      }
      else{
        this.flashMessage.show(data.message, {
          cssClass: 'alert-danger', 
          timeout: 5000})
      }

    });
  }
}

