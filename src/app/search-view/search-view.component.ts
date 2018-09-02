import { Component, OnInit,OnChanges, Input  } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { LoginAuthService } from '../login-auth.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.css']
})
export class SearchViewComponent implements OnInit {
  @Input() name: any = [];
  Username: string;
  profile: any;
  subName:string;
  public userName:any;
  public repoName:any;
  public gistName:any;
  public followrsName:any;
  public followringName:any;
  suggestionArray: string[] = [];
  user:any;
  results:any=[];
  userDetails:any;
  p: number = 1;
  q:number =1;
  m:number=1;
  n:number=1;
  constructor(public auth: AuthService, public loginService :LoginAuthService,
    public router :Router,private _route: ActivatedRoute) { 
      this.ngOnInit();
    }


  ngOnInit() {
    let myUserName = this._route.snapshot.paramMap.get('user');
    console.log(myUserName);
    this.loginService.getUser(myUserName).subscribe(
    data => {
        this.userDetails = data;

        
         // Get all repos of user
         this.loginService.getRepo(this.userDetails.login).subscribe(
          data => {
            this.repoName = data;
          },
          error => {
           console.log(error);
          });



      // Get all gists of user

      this.loginService.getGist(this.userDetails.login).subscribe(
        data => {
          this.gistName = data;
        },
        error => {
         console.log(error);
        });


      // Get all followers of user

      this.loginService.getFollowers(this.userDetails.login).subscribe(
        data => {
          this.followrsName = data;
        },
        error => {
         console.log(error);
        });




      // Get all following user

      this.loginService.getFollowing(this.userDetails.login).subscribe(
        data => {
          this.followringName = data;
        },
        error => {
         console.log(error);
        });


    },
    error => {
     console.log(error);
    }
   )

  
   
  }

  public userSearch() : any {
    
     this.user = this.Username;
     this.router.navigate(['/searchUser',this.user]);
     
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

  


  




}
