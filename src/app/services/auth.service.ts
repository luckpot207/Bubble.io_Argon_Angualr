import { environment } from './../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }
  apiURL = environment.APIURL;

  //WORKFLOW API
  login(body: any) {
    return this._http.post(this.apiURL + 'wf/login', body, {
      observe: 'body',
    })
  }
  signup(user: any) {
    return this._http.post(this.apiURL + 'wf/signup', user)
  }
  logout(token) {
    return this._http.post(this.apiURL + 'wf/logout?api_token=' + token, token)
  }

  //OBJ/DATA API
  getAllUser() {
    return this._http.get(this.apiURL + 'obj/user')
  }
  getCurrentUser(userId) {
    return this._http.get(this.apiURL + 'obj/user/' + userId)
  }

  //CUSTOM OBJ/DATA API
  getAllPosts() {
    return this._http.get(this.apiURL + 'obj/posts')
  }
}
