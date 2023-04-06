import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { RestaurantModel } from 'src/app/models/RestaurantModel';
import { SaveRatingModel } from 'src/app/models/SaveRatingModel';
import { AppAuthService } from 'src/app/services/auth.service';
import { AuthService } from 'src/app/services/AuthService';
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
  restaurantData: RestaurantModel[] = []
  paginationRestaurantData: RestaurantModel[] = []

  constructor(private modalService: BsModalService, 
    private _appAuthService: AppAuthService, 
    private _restaurantService: RestaurantService,
    private _authService: AuthService) {
    this.loginResponse = new LoginResponse();
  }

  ngOnInit() {
    this._authService.getCurrentUserInfo().subscribe(res => {
        this.loginResponse = JSON.parse(JSON.stringify(res));
        this._appAuthService.finishAuth(this.loginResponse);

        if(this.loginResponse.isNew){
          this._restaurantService.GetRandomRestaurants().subscribe(res => {
              this.restaurantData = JSON.parse(JSON.stringify(res));
              this.paginationRestaurantData = this.restaurantData.slice(0, 5);
          });
        }else{
          this._restaurantService.GetRecommendedRestaurants(this.loginResponse.userId).subscribe(res =>{
            this.restaurantData = JSON.parse(JSON.stringify(res));
            this.paginationRestaurantData = this.restaurantData.slice(0, 5);
          });
        }
    });
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

      this._restaurantService.saveRestaurantRating(ratingModel).subscribe(res => {
        console.log(this._appAuthService.isNew())
        if(this._appAuthService.isNew()){
          this._authService.updateCurrentUserInfo().subscribe(res => {
            this._appAuthService.finishAuth(JSON.parse(JSON.stringify(res)));
            this.ngOnInit();
          });
        }

        this._restaurantService.GetRecommendedRestaurants(this.loginResponse.userId).subscribe(res =>{
          this.restaurantData = JSON.parse(JSON.stringify(res));
          this.paginationRestaurantData = this.restaurantData.slice(0, 5);
        });
      });

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

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.paginationRestaurantData = this.restaurantData.slice(startItem, endItem);
  }
}
