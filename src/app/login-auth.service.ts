import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  private url = 'https://api.github.com/users';

  constructor(private _http: HttpClient) { }
}
