import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LoginAuthService } from '../login-auth.service';
import { getLocaleExtraDayPeriods } from '@angular/common';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Username: string;
  profile: any;
  subName: string;
  userDetails:any;
  public userName: any;
  public repoName: any;
  public gistName: any;
  public followrsName: any;
  public followringName : any;
  user: any;
  results:any=[];
  suggestionArray: string[] = [];

  p: number = 1;
  q: number = 1;
  m: number = 1;
  n: number =1;
  constructor(public auth: AuthService, public loginService: LoginAuthService,
    public router :Router,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    if (this.auth.userProfile) {

      this.profile = this.auth.userProfile;
      this.subName = this.profile.nickname;
      this.loginService.getUser(this.subName).subscribe(
        data => {
          this.spinnerService.hide();
          this.userName = data;
          this.getDetails();
        },
        error => {
          console.log(error);
        })

    } else {
      this.spinnerService.show();
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.subName = this.profile.nickname;
        this.loginService.getUser(this.subName).subscribe(
          data => {
            this.spinnerService.hide();
            this.userName = data;
            this.getDetails();

          },
          error => {
            console.log(error);
          }
        )
      });
    }



  }

  public getDetails() {
    this.getRepo();
    this.getGist();
    this.getFollowers();
    this.getFollowing();
   // this.userSearch();
  }


  // Get all repos of user
  getRepo() {
    this.loginService.getRepo(this.userName.login).subscribe(
      data => {
        this.repoName = data;
      },
      error => {
        console.log(error);
      });
  }




  // Get all gists of user       
  getGist() {

    this.loginService.getGist(this.userName.login).subscribe(
      data => {
        this.gistName = data;
      },
      error => {
        console.log(error);
      });

  }

  // Get all followers of user
  getFollowers() {
    this.loginService.getFollowers(this.userName.login).subscribe(
      data => {
        this.followrsName = data;

      },
      error => {
        console.log(error);
      });
  }



// Get all following user
  getFollowing()
  {
    this.loginService.getFollowing(this.userName.login).subscribe(
    data => {
              this.followringName = data;
             },
    error => {
              console.log(error);
             });

  }

  userSuggestion():any {
    if (this.Username.length >= 3) {
      this.loginService.searchUser(this.Username).subscribe(
        data => {
          this.suggestionArray.length = 0;
          this.results = data;
           if(this.results.items){
            this.results.items.map(item => {
              this.suggestionArray.push(item.login);
            })
          }
        },
        error => {
          console.log(error);
        }
      )
    }
    else this.suggestionArray.length = 0;
  }



  selectValue(value) {

    this.Username = value;
    this.suggestionArray = [];

  }

  public userSearch() : any {

    this.user = this.Username;
   this.router.navigate(['/searchUser',this.user]);

  }




}
