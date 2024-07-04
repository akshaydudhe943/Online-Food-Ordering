package com.akshay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akshay.model.Cart;
import com.akshay.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long>{
	
	public Cart findByCustomerId(Long userId);

}
