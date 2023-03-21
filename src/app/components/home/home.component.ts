import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { RestaurantModel } from 'src/app/models/RestaurantModel';
import { AppAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modalRef?: BsModalRef;
  loginResponse: LoginResponse;
  restaurantData: RestaurantModel[] = [
    {
      "Id": 1,
      "PlaceId": 12341,
      "Cuisine": "Italian",
      "Rank": 1
    },
    {
      "Id": 2,
      "PlaceId": 12342,
      "Cuisine": "Italian",
      "Rank": 2
    },
    {
      "Id": 3,
      "PlaceId": 12343,
      "Cuisine": "Italian",
      "Rank": 3
    }
  ]

  constructor(private modalService: BsModalService, private _appAuthService: AppAuthService) {
    this.loginResponse = new LoginResponse();
  }

  ngOnInit() {
    this.loginResponse = this._appAuthService.getLoggedUserInfo();

    console.log(this._appAuthService.getLoggedUserInfo());
  }

  x = 5;
  y = 0;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public logout() {
    this._appAuthService.logout();
  }
}
