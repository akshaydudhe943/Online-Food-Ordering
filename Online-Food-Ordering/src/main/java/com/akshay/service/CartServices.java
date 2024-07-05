package com.akshay.service;

import com.akshay.model.Cart;
import com.akshay.model.CartItem;
import com.akshay.request.AddCartItemRequest;

public interface CartServices {
	
	public CartItem addItemToCart(AddCartItemRequest request,String jwt)throws Exception;
	
	public CartItem updateCartItemQuantity(Long cartItemId,int quantity)throws Exception;
	
	public Cart removeItemFromCart(Long cartItemId, String jwt)throws Exception;
	
	public Long calculateCartTotal(Cart cart)throws Exception;
	
	public Cart findCartById(Long id)throws Exception;

	public Cart findCartByUserId(Long id)throws Exception;
	
	public Cart clearCart(Long id)throws Exception;

}
