import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { SaveRatingModel } from "../models/SaveRatingModel";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService{
    
    baseUrl = environment.API_URL;
    constructor(private http: HttpClient){}

    saveRestaurantRating(saveRating: SaveRatingModel){
        return this.http.post(this.baseUrl + "/Restaurant/RateRestaurant", saveRating);
    }

    GetRandomRestaurants(){
        return this.http.get(this.baseUrl + "/Restaurant/GetRandomRestaurants");
    }

    GetRecommendedRestaurants(id: string){
        return this.http.get(this.baseUrl + "/Restaurant/GetRecommendedRestaurants/" + id);
    }

}
