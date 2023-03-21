import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginResponse } from "../models/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AppAuthService{
    
    constructor(private http: HttpClient, private _router: Router) {
        
    }

    public finishAuth(loginResponse: LoginResponse){
        if(loginResponse.user_id != null){
            localStorage.setItem('isUserLoggedIn', "true");
            localStorage.setItem('loggedInUserInfo', JSON.stringify(loginResponse));
        }
    }

    public getLoggedUserInfo(): LoginResponse {
        let userModel: LoginResponse = JSON.parse(JSON.stringify(localStorage.getItem('loggedInUserInfo')));
        return userModel;
    }

    public isAuthenticated(): boolean {
        return (localStorage.getItem('isUserLoggedIn') == "true" ? true : false);
    }

    public logout() {
        localStorage.clear();
        this._router.navigate(['/']);
      }
    
      public login() {
        this._router.navigate(['/']);
      }
    
      public navigateToHomePage() {
        this._router.navigate(['/home']);
      }
}