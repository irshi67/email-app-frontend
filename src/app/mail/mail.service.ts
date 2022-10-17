import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Mail } from './mail';
import { MailStatus } from './mailstatus.enum';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  public getInbox(email: string): Observable<Mail[]> {
    return this.http.get<Mail[]>(`${this.apiUrl}/user/${email}/inbox`);
  }

  public getSent(email: string): Observable<Mail[]> {
    return this.http.get<Mail[]>(`${this.apiUrl}/user/${email}/sent`);
  }

  public getEmail(mailId: string): Observable<Mail> {
    return this.http.get<Mail>(`${this.apiUrl}/mail/${mailId}`);
  }

  public sendMail(mailForm: NgForm): Observable<Mail> {
    return this.http.post<Mail>(`${this.apiUrl}/mail/sent`, mailForm);
  }

  public updateMail(mailId: String): Observable<Mail> {
    return this.http.get<Mail>(`${this.apiUrl}/mail/${mailId}/update`);
  }

  public updateStatus(mailId: String, status: MailStatus): Observable<Mail> {
    return this.http.get<Mail>(`${this.apiUrl}/mail/${mailId}/update/${status}`);
  }

}
