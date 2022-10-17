import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public users?: User[];
  
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }

  public registerUser(userForm: NgForm):void {
    this.userService.registerUser(userForm.value).subscribe(
      (response: User) => {
        console.log(response);
        userForm.reset();
        this.router.navigate(['/login']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
