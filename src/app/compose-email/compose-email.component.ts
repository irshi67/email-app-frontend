import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Mail } from '../mail/mail';
import { MailService } from '../mail/mail.service';

@Component({
  selector: 'app-compose-email',
  templateUrl: './compose-email.component.html',
  styleUrls: ['./compose-email.component.css']
})
export class ComposeEmailComponent implements OnInit {

  mail: Mail;

  constructor(private mailService: MailService, private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  public sendMail(mailForm: NgForm):void {
    mailForm.value.to = mailForm.value.to.split(',');
    mailForm.value.from = this.cookieService.get('email');
    this.mailService.sendMail(mailForm.value).subscribe();
    this.router.navigate(['/inbox']);
  }
}
