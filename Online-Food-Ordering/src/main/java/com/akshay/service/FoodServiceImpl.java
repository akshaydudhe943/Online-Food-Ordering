package com.akshay.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.akshay.model.Category;
import com.akshay.model.Food;
import com.akshay.model.Restaurant;
import com.akshay.repository.FoodRepository;
import com.akshay.request.CreateFoodRequest;

public class FoodServiceImpl implements FoodService {

	@Autowired
	private FoodRepository foodRepository;
	
	@Override
	public Food createFood(CreateFoodRequest request, Category category, Restaurant restaurant) {

		Food food = new Food();
		
		food.setFoodCategory(category);
		food.setRestaurant(restaurant);
		food.setDescription(request.getDescription());
		food.setImages(request.getImages());
		food.setName(request.getName());
		food.setPrice(request.getPrice());
		food.setIngredients(request.getIngredients());
		food.setSeasonal(request.isSeasonal());
		food.setVegetarian(request.isVegetarin());
		
		Food savedFood =  foodRepository.save(food);
		restaurant.getFoods().add(savedFood);
		
		return savedFood;
	}

	@Override
	public void deleteFood(Long foodId) throws Exception {
		
		Food food = findFoodById(foodId);
		
		food.setRestaurant(null);
		foodRepository.save(food);
	}

	@Override
	public List<Food> getrestaurantsFood(Long RestaurantId, boolean isVegitarian, boolean isNonveg, boolean isSeasonal,
			String foodCategory) {

		List<Food> foods = foodRepository.findByRestaurantId(RestaurantId);
		
		if(isVegitarian) {
			foods=filterByVegitarian(foods,isVegitarian);
		}
		if(isSeasonal) {
			foods=filterBySeasonal(foods,isSeasonal);
		}
		if(isNonveg) {
			foods=filterByNonveg(foods,isNonveg);
		}
		if(foodCategory!=null && !foodCategory.equals("")) {
			foods=filterFoodByCategory(foods,foodCategory);
		}
		return foods;
	}

	private List<Food> filterFoodByCategory(List<Food> foods, String foodCategory) {
		return foods.stream().filter(food->{
			if(food.getFoodCategory()!=null) {
				return food.getFoodCategory().getName().equals(foodCategory);
			}
			else return false;
		}).collect(Collectors.toList());
	}

	private List<Food> filterByNonveg(List<Food> foods, boolean isNonveg) {
		return foods.stream().filter(food->food.isVegetarian()==false).collect(Collectors.toList());
	}

	private List<Food> filterBySeasonal(List<Food> foods, boolean isSeasonal) {
		return foods.stream().filter(food->food.isSeasonal()==isSeasonal).collect(Collectors.toList());
	}

	private List<Food> filterByVegitarian(List<Food> foods, boolean isVegitarian) {
		return foods.stream().filter(food->food.isVegetarian()==isVegitarian).collect(Collectors.toList());
	}

	@Override
	public List<Food> searchFood(String keyword) {
		return foodRepository.searchFood(keyword);
	}

	@Override
	public Food findFoodById(Long foodId) throws Exception {

		Optional<Food> optionalFood = foodRepository.findById(foodId);
		
		if(optionalFood.isEmpty()) {
			throw new Exception("food not exist...");
		}
		return optionalFood.get();
	}

	@Override
	public Food updateAvailabilityStatus(Long foodId) throws Exception {
		Food food = findFoodById(foodId);
		food.setAvailable(!food.isAvailable());
		return foodRepository.save(food);
	}

}
