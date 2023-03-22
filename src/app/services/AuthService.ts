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
        return this.http.post(this.baseUrl + "/User/Login", loginData);
    }

    registration(registrationData: LoginModel){
        return this.http.post(this.baseUrl + "/User/CreateUser", registrationData);
    }

}