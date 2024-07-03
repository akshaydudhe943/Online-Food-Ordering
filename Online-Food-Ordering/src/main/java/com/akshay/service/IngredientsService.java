package com.akshay.service;

import java.util.List;

import com.akshay.model.IngredientsCategory;
import com.akshay.model.IngredientsItem;

public interface IngredientsService {

	public IngredientsCategory createIngredientsCategory(String name, Long restaurantId)throws Exception;
	
	public IngredientsCategory findIngredientsCategoryById(Long id)throws Exception;
	
	public List<IngredientsCategory> findIngredientsCategoryByRestaurantId(Long id)throws Exception;
	
	public IngredientsItem createIngridiantItem(Long restaurantId, String ingrediantName, Long categoryId)throws Exception;
	
	public List<IngredientsItem> findRestaurantIngridiants(Long restauantId)throws Exception;
	
	public IngredientsItem updateStock(Long id)throws Exception;
	
}
