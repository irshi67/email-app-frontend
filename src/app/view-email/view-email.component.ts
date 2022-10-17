import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Mail } from '../mail/mail';
import { MailService } from '../mail/mail.service';
import { MailStatus } from '../mail/mailstatus.enum';

@Component({
  selector: 'app-view-email',
  templateUrl: './view-email.component.html',
  styleUrls: ['./view-email.component.css']
})
export class ViewEmailComponent implements OnInit {

  emails : Mail;
  
  constructor(private mailService: MailService, private cookieService: CookieService,private router: Router) { }

  ngOnInit(): void {
    this.getEmail()
  }

  public getEmail() : void {
    this.mailService.getEmail(this.cookieService.get('mailId'))
    .subscribe(mail => this.emails = mail);
  }

  public sendMail(mailForm: NgForm): void {
    mailForm.value.to = this.emails.from;
    mailForm.value.to = mailForm.value.to.split(',');
    mailForm.value.from = this.cookieService.get('email');
    mailForm.value.subject = this.emails.subject;
    mailForm.value.read = false;
    if(this.emails.reply != null){
      mailForm.value.message = this.emails.reply;
    } else {
      mailForm.value.message = this.emails.message;
    }
    this.mailService.sendMail(mailForm.value).subscribe();
    this.router.navigate(['/inbox']);
  }

  public setStatusStarred(): void {
    if(this.emails.status != MailStatus.STARRED){
      this.mailService.updateStatus(this.emails.id, MailStatus.STARRED).subscribe();
    }
  }

  public setStatusUnStarred(): void {
    if(this.emails.status != MailStatus.NORMAL){
      this.mailService.updateStatus(this.emails.id, MailStatus.NORMAL).subscribe();
    }
  }

  public setStatusImportant(): void {
    if(this.emails.status != MailStatus.IMPORTANT){
      this.mailService.updateStatus(this.emails.id, MailStatus.IMPORTANT).subscribe();
    }
  }

  public setStatusTrash(): void {
    if(this.emails.status != MailStatus.TRASH){
      this.mailService.updateStatus(this.emails.id, MailStatus.TRASH).subscribe();
    }
  }


}
