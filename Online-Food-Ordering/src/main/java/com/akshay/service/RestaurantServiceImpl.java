package com.akshay.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.dto.RestaurantDto;
import com.akshay.model.Address;
import com.akshay.model.Restaurant;
import com.akshay.model.User;
import com.akshay.repository.AddressRepository;
import com.akshay.repository.RestaurantRepository;
import com.akshay.repository.UserRepository;
import com.akshay.request.CreateRestaurantRequest;

@Service
public class RestaurantServiceImpl implements RestaurantService {

	@Autowired
	private RestaurantRepository restaurantRepository;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public Restaurant createRestaurant(CreateRestaurantRequest request, User user) {
		Address address = addressRepository.save(request.getAddress());
		
		Restaurant restaurant = new Restaurant();
		
		restaurant.setAddress(address);
		restaurant.setContactInformation(request.getContactInformation());
		restaurant.setCuisineType(request.getCuisineType());
		restaurant.setDescription(request.getDescription());
		restaurant.setImages(request.getImages());
		restaurant.setName(request.getName());
		restaurant.setOpeningHours(request.getOpeningHours());
		restaurant.setRegistrationDate(LocalDate.now());
		restaurant.setOwner(user);
		
		return restaurantRepository.save(restaurant);
	}

	@Override
	public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {
		Restaurant restaurant = findRestaurantById(restaurantId);
		
		if(restaurant.getCuisineType()!=null) {
			restaurant.setCuisineType(updatedRestaurant.getCuisineType());
		}
		if(restaurant.getDescription()!=null) {
			restaurant.setDescription(updatedRestaurant.getDescription());
		}
		if(restaurant.getAddress()!=null) {
			restaurant.setAddress(updatedRestaurant.getAddress());
		}
		if(restaurant.getName()!=null) {
			restaurant.setName(updatedRestaurant.getName());
		}
		if(restaurant.getOpeningHours()!=null) {
			restaurant.setOpeningHours(updatedRestaurant.getOpeningHours());
		}
		
		return restaurant;
	}

	@Override
	public void deleteRestaurant(Long restaurantId) throws Exception {
		
		Restaurant restaurant = findRestaurantById(restaurantId);
		restaurantRepository.delete(restaurant);
	}

	@Override
	public List<Restaurant> getAllRestaurant() {
		return restaurantRepository.findAll();
	}

	@Override
	public List<Restaurant> searchRestaurant(String keyword) {
		return restaurantRepository.findBySearchQuery(keyword);
	}

	@Override
	public Restaurant findRestaurantById(Long id) throws Exception {
			
		Optional<Restaurant> opt = restaurantRepository.findById(id);
		
		if(opt.isEmpty()) {
			throw new Exception("Restaurant not found with id "+id);
		}
		
		return opt.get();
	}
	
	@Override
	public Restaurant getRestaurantByUserId(Long userId) throws Exception {
		Restaurant restaurant = restaurantRepository.findByOwnerId(userId);
		
		if(restaurant==null) {
			throw new Exception("Restaurant not found with owner id "+ userId);
		}
		return restaurant;
	}

	@Override
	public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {

		Restaurant restaurant = findRestaurantById(restaurantId);
		
		RestaurantDto dto = new RestaurantDto();
		dto.setDescription(restaurant.getDescription());
		dto.setId(restaurantId);
		dto.setTitle(restaurant.getName());
		dto.setImages(restaurant.getImages());
		
		boolean isFavourite = false;
		List<RestaurantDto> favourites = user.getFavorites();
		for(RestaurantDto favourite : favourites) {
			if(favourite.getId().equals(restaurantId)) {
				isFavourite=true;
				break;
			}
		}
		if(isFavourite) {
			favourites.removeIf(favourite-> favourite.getId().equals(restaurantId));
		}else {
			favourites.add(dto);
		}
				
		userRepository.save(user);

		return dto;
	}

	@Override
	public Restaurant updateRestaurantStatus(Long id) throws Exception {
		
		Restaurant restaurant = findRestaurantById(id);
		restaurant.setOpen(!restaurant.isOpen());
		
		return restaurantRepository.save(restaurant);
	}

}






