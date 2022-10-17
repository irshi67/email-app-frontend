import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Mail } from '../mail/mail';
import { MailService } from '../mail/mail.service';
import { MailStatus } from '../mail/mailstatus.enum';
import { UserService } from '../user/user.service';
import { ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  mails: Mail[] = [];
  mailIds: String[] = [];
  MailStatus = MailStatus;
  inbox: boolean;
  myForm: FormGroup;
  mailFormArray: FormArray;
  firstName: string;
  
  constructor(private userService: UserService, private mailService: MailService,
    private router: Router, private cookieService: CookieService, private ref: ChangeDetectorRef, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getInbox();
    this.myForm = this.fb.group({
      mailId: this.fb.array([])
    });
    this.firstName = this.cookieService.get('firstName');
  }

  onChange(mailid: string, isChecked: boolean) {
    this.mailFormArray = <FormArray>this.myForm.controls['mailId'];

    if (isChecked) {
      this.mailFormArray.push(new FormControl(mailid));
    } else {
      let index = this.mailFormArray.controls.findIndex(x => x.value == mailid)
      this.mailFormArray.removeAt(index);
    }
    console.log(this.mailFormArray.value);
  }

  setStatusStared(): void {
    this.mailFormArray.value.forEach(mailId => {
      this.mailService.updateStatus(mailId, MailStatus.STARRED).subscribe(_ => this.getInbox());
    });
    this.mailFormArray.clear();
  }

  setStatusUnStared(): void {
    this.mailFormArray.value.forEach(mailId => {
      this.mailService.updateStatus(mailId, MailStatus.NORMAL).subscribe(_ => this.getInbox());
    });
    this.mailFormArray.clear();
  }

  setStatusImportant(): void {
    this.mailFormArray.value.forEach((mailId: string) => {
      this.mailService.updateStatus(mailId, MailStatus.IMPORTANT).subscribe(_ => this.getInbox())
    });
    this.mailFormArray.clear();
  }

  setStatusTrash(): void {
    this.mailFormArray.value.forEach((mailId: string) => {
      this.mailService.updateStatus(mailId, MailStatus.TRASH).subscribe(_ => this.getInbox())
    });
    this.mailFormArray.clear();
  }

  getStatusStared(): void {
    this.mailService.getInbox(this.cookieService.get('email'))
      .subscribe(mails => this.mails = (mails.filter(mail => mail.status == MailStatus.STARRED)));
    this.inbox = true;
    if (this.mailFormArray != undefined && this.mailFormArray.length != 0){
      this.mailFormArray.clear();
    }
  }

  getStatusImportant(): void {
    this.mailService.getInbox(this.cookieService.get('email'))
      .subscribe(mails => this.mails = (mails.filter(mail => mail.status == MailStatus.IMPORTANT)));
    this.inbox = true;
    if (this.mailFormArray != undefined && this.mailFormArray.length != 0){
      this.mailFormArray.clear();
    }
  }

  getStatusTrash(): void {
    this.mailService.getInbox(this.cookieService.get('email'))
      .subscribe(mails => this.mails = (mails.filter(mail => mail.status == MailStatus.TRASH)));
    this.inbox = true;
    if (this.mailFormArray != undefined && this.mailFormArray.length != 0){
      this.mailFormArray.clear();
    }
  }

  public getInbox(): void {
    this.mailService.getInbox(this.cookieService.get('email'))
      .subscribe(mails => this.mails = (mails.filter(mail => mail.status != MailStatus.TRASH )));
    this.inbox = true;
  }

  public getSent(): void {
    this.mailService.getSent(this.cookieService.get('email'))
      .subscribe(mails => this.mails = (mails));
    this.inbox = false;
    if (this.mailFormArray != undefined && this.mailFormArray.length != 0){
      this.mailFormArray.clear();
    }
  }

  public viewEmail(mail: Mail): void {
    this.cookieService.set('mailId', mail.id);
    this.router.navigate(['/view-email']);
    this.mailService.updateMail(this.cookieService.get('mailId')).subscribe();
  }

  public logOut(): void {
    this.userService.logoutUser(this.cookieService.get('email')).subscribe();
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }

}
