package com.akshay.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.model.IngredientsCategory;
import com.akshay.model.IngredientsItem;
import com.akshay.request.IngredientCategoryRequest;
import com.akshay.request.IngredientRequest;
import com.akshay.service.IngredientsService;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

	@Autowired
	private IngredientsService ingredientsService;

	@PostMapping("/category")
	public ResponseEntity<IngredientsCategory> createIngredientsCategory(@RequestBody IngredientCategoryRequest request) throws Exception{
		IngredientsCategory item = ingredientsService.createIngredientsCategory(request.getName(), request.getRestaurantId());
		
		return new ResponseEntity<>(item,HttpStatus.CREATED);
	}
	
	@PostMapping()
	public ResponseEntity<IngredientsItem> createIngredientItem(@RequestBody IngredientRequest request) throws Exception{
		IngredientsItem item = ingredientsService.createIngridiantItem(request.getRestaurantId(), request.getName(), request.getCategoryId());
		
		return new ResponseEntity<>(item,HttpStatus.CREATED);
	}
	
	@PutMapping("/{id}/stoke")
	public ResponseEntity<IngredientsItem> updateIngrediantStock(@PathVariable Long id) throws Exception{
		IngredientsItem item = ingredientsService.updateStock(id);
		
		return new ResponseEntity<>(item,HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}")
	public ResponseEntity<List<IngredientsItem>> getRestaurantIngredients(@PathVariable Long id) throws Exception{
		List<IngredientsItem> items = ingredientsService.findRestaurantIngridiants(id);
		
		return new ResponseEntity<>(items,HttpStatus.OK);
	}
	
	@GetMapping("/restaurant/{id}/category")
	public ResponseEntity<List<IngredientsCategory>> getRestaurantIngredientCategory(@PathVariable Long id) throws Exception{
		List<IngredientsCategory> items = ingredientsService.findIngredientsCategoryByRestaurantId(id);
		
		return new ResponseEntity<>(items,HttpStatus.OK);
	}
}







