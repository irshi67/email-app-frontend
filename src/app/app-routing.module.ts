import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComposeEmailComponent } from './compose-email/compose-email.component';
import { InboxComponent } from './inbox/inbox.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewEmailComponent } from './view-email/view-email.component';

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "inbox", component: InboxComponent},
  {path: "new-email", component:ComposeEmailComponent},
  {path: "view-email", component:ViewEmailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
