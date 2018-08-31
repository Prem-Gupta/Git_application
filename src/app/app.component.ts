import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthService,public router :Router) {
    auth.handleAuthentication();
  }

  public btnsearch()
  {
    this.router.navigateByUrl('/searchUser');
  }

  public myprofile()
  {
    this.router.navigateByUrl('/profile');
  }
}
