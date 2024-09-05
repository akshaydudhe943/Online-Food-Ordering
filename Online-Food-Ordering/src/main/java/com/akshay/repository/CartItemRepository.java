package com.akshay.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akshay.model.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem,Long>{
	
	List<CartItem> findByCart_CustomerId(Long userId);

}
