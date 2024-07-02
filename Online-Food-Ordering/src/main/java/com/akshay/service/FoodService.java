package com.akshay.service;

import java.util.List;

import com.akshay.model.Category;
import com.akshay.model.Food;
import com.akshay.model.Restaurant;
import com.akshay.request.CreateFoodRequest;

public interface FoodService {

	public Food createFood(CreateFoodRequest request,Category category,Restaurant restaurant);
	
	void deleteFood(Long foodId)throws Exception;
	
	public List<Food> getrestaurantsFood(Long RestaurantId, boolean isVegitarian, boolean isNonveg, boolean isSeasonal, String foodCategory);
	
	public List<Food> searchFood(String keyword);
	
	public Food findFoodById(Long foodId)throws Exception;
	
	public Food updateAvailabilityStatus(Long foodId)throws Exception;
}
