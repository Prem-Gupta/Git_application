import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LoginAuthService } from '../login-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  Username: string;
  profile: any;
  subName:string;
  userName:any;
  user:any;
  suggestionArray: string[] = [];
  results:any=[];
  constructor(public auth: AuthService, public loginService :LoginAuthService) { }

  ngOnInit() {
  
    if(this.auth.userProfile) {
      this.profile = this.auth.userProfile;
        
    } else {

      this.auth.getProfile((err, profile) => {
      
        this.profile = profile;
        this.subName = this.profile.nickname;
      //  console.log(this.profile); get email from here

       this.loginService.getUser(this.subName).subscribe(
        data => {
          this.userName = data;
           console.log(this.userName);
        },
        error => {
         console.log(error);
        }
       )


      });
    }
  }


  public userSearch() : any {
    this.user = this.Username;
   // this.suggestionArray = [];
   this.loginService.getUser(this.user).subscribe(
    data => {
    
       console.log(data);
    },
    error => {
     console.log(error);
    }
   )
  }

  userSuggestion():any {
    if (this.Username.length >= 3) {
      this.loginService.searchUser(this.Username).subscribe(
        data => {
          this.suggestionArray.length = 0;
          this.results = data;
       //   console.log(this.results.items);
           if(this.results.items){
            this.results.items.map(item => {
              this.suggestionArray.push(item.login);
            })
          }
          // console.log(this.suggestionArray,123)
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
 // console.log(this.Username);
    this.suggestionArray = [];

  }




}
