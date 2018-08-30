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


}
