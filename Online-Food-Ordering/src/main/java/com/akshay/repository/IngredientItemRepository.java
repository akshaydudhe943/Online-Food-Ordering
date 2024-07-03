package com.akshay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akshay.model.IngredientsCategory;
import com.akshay.model.IngredientsItem;

@Repository
public interface IngredientItemRepository extends JpaRepository<IngredientsItem,Long> {

	List<IngredientsItem> findByRestaurantId(Long id);
	
}
