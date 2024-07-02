package com.akshay.service;

import java.util.List;

import com.akshay.dto.RestaurantDto;
import com.akshay.model.Restaurant;
import com.akshay.model.User;
import com.akshay.request.CreateRestaurantRequest;

public interface RestaurantService {
	
	public Restaurant createRestaurant(CreateRestaurantRequest request,User user);
	
	public Restaurant updateRestaurant(Long restaurantId,CreateRestaurantRequest updatedRestaurant) throws Exception;
	
	public void deleteRestaurant(Long restaurantId) throws Exception;
	
	public List<Restaurant> getAllRestaurant();
	
	public List<Restaurant> searchRestaurant(String keyword);

	public Restaurant findRestaurantById(Long id)throws Exception;
	
	public Restaurant getRestaurantByUserId(Long id)throws Exception;
	
	public RestaurantDto addToFavorites(Long restaurantId, User user)throws Exception;
	
	public Restaurant updateRestaurantStatus(Long id)throws Exception;
}
