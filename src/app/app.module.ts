import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginAuthService } from './login-auth.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SearchViewComponent } from './search-view/search-view.component';
import { SearchBoxComponent } from './search-box/search-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    ProfileComponent,
    SearchViewComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'login', component:LoginComponent },
      { path: 'profile', component:ProfileComponent,canActivate:[AuthGuard] },
      { path: '',  redirectTo: '/login', pathMatch: 'full' },
      { path: '**', component: NotFoundComponent }


    ])
  ],
  providers: [AuthService, LoginAuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
