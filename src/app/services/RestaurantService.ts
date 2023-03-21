import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SaveRatingModel } from "../models/SaveRatingModel";

@Injectable({
    providedIn: 'root'
})

export class RestaurantService{
    
    constructor(private http: HttpClient){}

    saveRestaurantRating(saveRating: SaveRatingModel){
        console.log(saveRating);
    }
}
