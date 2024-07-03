package com.akshay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.model.Food;
import com.akshay.model.Restaurant;
import com.akshay.request.CreateFoodRequest;
import com.akshay.response.MessageResponse;
import com.akshay.service.FoodService;
import com.akshay.service.RestaurantService;

@RestController
@RequestMapping("api/admin/food")
public class AdminFoodController {
	
	@Autowired
	private FoodService foodService;
	
	@Autowired
	private RestaurantService restaurantService;
	
	@PostMapping
	public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest request,@RequestHeader("Authorization") String jwt) throws Exception{
		Restaurant restaurant = restaurantService.findRestaurantById(request.getRestaurantId());
		Food food = foodService.createFood(request, request.getCategory(), restaurant);
		
		return new ResponseEntity<>(food,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id,@RequestHeader("Authorization") String jwt) throws Exception{		
		foodService.deleteFood(id);
		MessageResponse message = new MessageResponse("Food deleted Successfully...");
		
		return new ResponseEntity<>(message,HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Food> updateFoodAvalability(@PathVariable Long id,@RequestHeader("Authorization") String jwt) throws Exception{

		Food food = foodService.updateAvailabilityStatus(id);
		
		return new ResponseEntity<>(food,HttpStatus.OK);
	}
	
}











