import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private userService: UserService, private router: Router, private cookieService: CookieService) { }

  email: string;
  showchild1: false;

  ngOnInit(): void {
  }

  public loginUser(userForm: NgForm): void {
    this.userService.loginUser(userForm.value).subscribe(
      (response: User) => {
        if (response.loggedIn === true) {
          this.router.navigate(['/inbox']);
          this.cookieService.set('email', response.email);
          this.cookieService.set('firstName', response.firstName);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
