import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/LoginResponse';
import { LoginModel } from '../models/LoginModel';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    baseUrl = environment.API_URL;
    constructor(private http: HttpClient) {
        
    }

    login(loginData: LoginModel){
        console.log(loginData);
        // let loginResponse = new LoginResponse();
        // loginResponse.id = 1;
        // loginResponse.user_id = "asif@sqa.com";
        // loginResponse.is_auth = true;
        // loginResponse.is_new = true;
        // loginResponse.message = "Login successfull!";
        // return loginResponse;
        //return this.http.post(this.baseUrl + "/login", loginData);
    }

    registration(registrationData: LoginModel){
        console.log(registrationData);
        //return this.http.post(this.baseUrl + "/registration", loginData);
    }

}