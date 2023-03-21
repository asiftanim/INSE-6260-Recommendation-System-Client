import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/LoginResponse';
import { LoginModel } from '../models/LoginModel';
import { environment } from 'src/environments/environment.development';
import { AppAuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    baseUrl = environment.API_URL;
    constructor(private http: HttpClient, private _authService: AppAuthService) {
        
    }

    login(loginData: LoginModel){
        console.log(loginData);
        let loginResponse = new LoginResponse();
        loginResponse.id = 1;
        loginResponse.user_id = "U12345";
        loginResponse.is_new = true;
        this._authService.finishAuth(loginResponse);
        this._authService.navigateToHomePage();
 
        //return this.http.post(this.baseUrl + "/login", loginData);
    }

    registration(registrationData: LoginModel){
        console.log(registrationData);
        //return this.http.post(this.baseUrl + "/registration", loginData);
    }

}