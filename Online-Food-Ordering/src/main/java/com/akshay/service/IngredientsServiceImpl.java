package com.akshay.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.model.IngredientsCategory;
import com.akshay.model.IngredientsItem;
import com.akshay.model.Restaurant;
import com.akshay.repository.IngredientCategoryRepository;
import com.akshay.repository.IngredientItemRepository;

@Service
public class IngredientsServiceImpl implements IngredientsService{
	
	@Autowired
	private IngredientItemRepository ingredientItemRepository;

	@Autowired
	private IngredientCategoryRepository ingredientCategoryRepository;
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Override
	public IngredientsCategory createIngredientsCategory(String name, Long restaurantId) throws Exception {

		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
		IngredientsCategory ingredientsCategory = new IngredientsCategory();
		ingredientsCategory.setRestaurant(restaurant);
		ingredientsCategory.setName(name);
		return ingredientCategoryRepository.save(ingredientsCategory);
	}

	@Override
	public IngredientsCategory findIngredientsCategoryById(Long id) throws Exception {

		Optional<IngredientsCategory> category = ingredientCategoryRepository.findById(id);
		
		if(category==null) {
			throw new Exception("Ingredient category not found.. ");
		}
		
		return category.get();
	}
	
	@Override
	public List<IngredientsCategory> findIngredientsCategoryByRestaurantId(Long id) throws Exception {
		restaurantService.findRestaurantById(id);//if not fount it throw exception
		return ingredientCategoryRepository.findByRestaurantId(id);
	}

	@Override
	public IngredientsItem createIngridiantItem(Long restaurantId, String ingrediantName, Long categoryId)
			throws Exception {
		
		Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
		IngredientsCategory category = findIngredientsCategoryById(categoryId);
		
		IngredientsItem item= new IngredientsItem();
		item.setName(ingrediantName);
		item.setRestaurant(restaurant);
		item.setCategory(category);
		
		IngredientsItem ingredient = ingredientItemRepository.save(item);
		category.getIngredients().add(ingredient);
		
		return ingredient;
	}

	@Override
	public List<IngredientsItem> findRestaurantIngridiants(Long restauantId) throws Exception {
		return ingredientItemRepository.findByRestaurantId(restauantId);
	}

	@Override
	public IngredientsItem updateStock(Long id) throws Exception {

		Optional<IngredientsItem> optionalIngredientItem = ingredientItemRepository.findById(id);
		
		if(optionalIngredientItem==null) {
			throw new Exception("Ingredient Not Found.. ");
		}
		
		return optionalIngredientItem.get();
	}
}
