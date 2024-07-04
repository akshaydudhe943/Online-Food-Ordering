package com.akshay.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.model.Cart;
import com.akshay.model.CartItem;
import com.akshay.model.Food;
import com.akshay.model.User;
import com.akshay.repository.CartItemRepository;
import com.akshay.repository.CartRepository;
import com.akshay.repository.UserRepository;
import com.akshay.request.AddCartItemRequest;

@Service
public class CartServiceImpl implements CartServices {

	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CartItemRepository cartItemRepository;
	
	@Autowired
	private FoodService foodService;
	
	@Override
	public CartItem addItemToCart(AddCartItemRequest request, String jwt) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		Food food = foodService.findFoodById(request.getFoodId());
		Cart cart = cartRepository.findByCustomerId(user.getId());
		
		for(CartItem cartItem:cart.getItem()) {
			if(cartItem.getFood().equals(food)) {
				int newQuantity = cartItem.getQuantity()+request.getQuantity();
				return updateCartItemQuantity(cartItem.getId(), newQuantity);
			}
		}
		
		CartItem newCartItem = new CartItem();
		newCartItem.setFood(food);
		newCartItem.setCart(cart);
		newCartItem.setQuantity(request.getQuantity());
		newCartItem.setIngredients(request.getIngredients());
		newCartItem.setTotalPrice(request.getQuantity()*food.getPrice());
		
		CartItem savedCartItem = cartItemRepository.save(newCartItem);
		cart.getItem().add(savedCartItem);
		return savedCartItem;
	}

	@Override
	public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {

		Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
		
		if(cartItemOptional.isEmpty()) {
			throw new Exception("cart item not exist...");
		}
		
		CartItem item = cartItemOptional.get();
		
		item.setQuantity(quantity);
		
		item.setTotalPrice(item.getTotalPrice()*quantity);
		
		return cartItemRepository.save(item);
	}

	@Override
	public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		Cart cart = cartRepository.findByCustomerId(user.getId());
		
		Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
		if(cartItemOptional.isEmpty()) {
			throw new Exception("cart item not exist...");
		}
		CartItem item = cartItemOptional.get();
		
		cart.getItem().remove(item);
		return cartRepository.save(cart);
	}

	@Override
	public Long calculateCartTotal(Cart cart) throws Exception {

		Long total = 0L;
		
		for(CartItem cartItem:cart.getItem()) {
			total+= cartItem.getFood().getPrice()*cartItem.getQuantity();
		}
		return total;
	}

	@Override
	public Cart findCartById(Long id) throws Exception {

		Optional<Cart> optionalCart = cartRepository.findById(id);
		if(optionalCart.isEmpty()) {
			throw new Exception("cart does not found with id "+id);
		}
		
		return optionalCart.get();
	}

	@Override
	public Cart findCartByUserId(String jwt) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		return cartRepository.findByCustomerId(user.getId());
	}

	@Override
	public Cart clearCart(String jwt) throws Exception {
		User user = userService.findUserByJwtToken(jwt);
		Cart cart = findCartByUserId(jwt);
		
		cart.getItem().clear();
		return cartRepository.save(cart);
	}

}
