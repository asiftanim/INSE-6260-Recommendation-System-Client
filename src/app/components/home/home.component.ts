import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { RestaurantModel } from 'src/app/models/RestaurantModel';
import { SaveRatingModel } from 'src/app/models/SaveRatingModel';
import { AppAuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/RestaurantService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modalRef?: BsModalRef;
  loginResponse: LoginResponse;
  selectedPlaceId: number;
  ratingNotSelected: boolean = false;
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

  constructor(private modalService: BsModalService, 
    private _appAuthService: AppAuthService, 
    private _restaurantService: RestaurantService) {
    this.loginResponse = new LoginResponse();
  }

  ngOnInit() {
    this.loginResponse = this._appAuthService.getLoggedUserInfo();
  }

  restaurantRating = 0;
 
  openModal(template: TemplateRef<any>, placeId: number) {
    this.selectedPlaceId = placeId;
    this.modalRef = this.modalService.show(template);
  }

  saveModal(){
    if(this.restaurantRating == 0){
      this.ratingNotSelected = true;
    }else{
      let ratingModel = new SaveRatingModel();
      ratingModel.UserId = this.loginResponse.userId;
      ratingModel.PlaceId = this.selectedPlaceId;
      ratingModel.Rating = this.restaurantRating;

      this._restaurantService.saveRestaurantRating(ratingModel);

      this.modalRef?.hide();
      this.restaurantRating = 0;
      this.selectedPlaceId = 0;
      this.ratingNotSelected = false;
    }
  }

  closeModal(){
      this.modalRef?.hide();
      this.restaurantRating = 0;
      this.selectedPlaceId = 0;
      this.ratingNotSelected = false;
  }

  public logout() {
    this._appAuthService.logout();
  }
}
