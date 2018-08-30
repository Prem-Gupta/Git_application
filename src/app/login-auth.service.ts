import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  private baseUrl = 'https://api.github.com/users/';
  private userUrl = 'https://api.github.com/search/users?q='
  constructor(private _http: HttpClient) { }

  public getUser(name:string)
  {
    let user = this._http.get(this.baseUrl+name)
    return user;
  }

  public searchUser(name:string)
  {
    let users = this._http.get(this.userUrl+name)
    return users;
  }

  public getRepo(name:string)
  {
    let repos = this._http.get(this.baseUrl+name+'/repos');
   // console.log(repos);
    return repos;
  }

  public getGist(name:string)
  {
    let gists = this._http.get(this.baseUrl+name+'/gists');
    // console.log(gists);
    return gists;
  }

  public getFollowers(name:string)
  {
    let followers = this._http.get(this.baseUrl+name+'/followers');
   // console.log(followers);
    return followers;
  }

  

}
