import { Component, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/LoginModel';
import { AuthService }  from "../../services/AuthService";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  
  loginForm = this.loginFormBuilder.group({
    userId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  registrationForm = this.registrationFormBuilder.group({
    regUserId: new FormControl('', [Validators.required]),
    regPassword: new FormControl('', [Validators.required]),
    regConPassword: new FormControl('', [Validators.required])
  }, 
  {
    validator: this.confirmedValidator('regPassword', 'regConPassword')
  });

  constructor(private loginFormBuilder: FormBuilder, private registrationFormBuilder: FormBuilder, private _authService: AuthService) {}

  get lf(){
    return this.loginForm.controls;
  }

  get rf(){
    return this.registrationForm.controls;
  }

  onLogin(): void {
    let loginModel = new LoginModel();
    let userId: any = this.loginForm.value.userId;
    let password: any = this.loginForm.value.password;

    loginModel.user_id = userId;
    loginModel.password = password;

    this._authService.login(loginModel);
    this.loginForm.reset();
  }

  onRegistration(): void {
    let loginModel = new LoginModel();
    let userId: any = this.registrationForm.value.regUserId;
    let password: any = this.registrationForm.value.regPassword;

    loginModel.user_id = userId;
    loginModel.password = password;

    this._authService.registration(loginModel);
    this.registrationForm.reset();
  }

  

  confirmedValidator(regPassword: any, conRegPassword: string){
    return (formGroup: FormGroup) => {
        const passwordControl = formGroup.controls[regPassword];
        const conPasswordControl = formGroup.controls[conRegPassword];
        if (conPasswordControl.errors && !conPasswordControl.errors['confirmedValidator']) {
            return;
        }
        if (passwordControl.value !== conPasswordControl.value) {
          conPasswordControl.setErrors({ confirmedValidator: true });
        } else {
          conPasswordControl.setErrors(null);
        }
    }
}

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }
}
