package com.akshay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.akshay.model.Cart;
import com.akshay.model.CartItem;
import com.akshay.model.User;
import com.akshay.request.AddCartItemRequest;
import com.akshay.request.UpdateCartitemRequest;
import com.akshay.service.CartServices;
import com.akshay.service.UserService;

@RestController
@RequestMapping("/api")
public class CartController {

	@Autowired
	private CartServices cartServices;
	
	@Autowired
	private UserService userService;
	
	@PutMapping("/cart/add")
	public ResponseEntity<CartItem> addItemToCart(@RequestBody AddCartItemRequest request,@RequestHeader("Authorization") String jwt)throws Exception{
		CartItem item = cartServices.addItemToCart(request, jwt);
		return new ResponseEntity<>(item,HttpStatus.OK);
	}
	
	@PutMapping("/cart-item/update")
	public ResponseEntity<CartItem> updateCartItemQuantity(@RequestBody UpdateCartitemRequest request,@RequestHeader("Authorization") String jwt)throws Exception{
		CartItem item = cartServices.updateCartItemQuantity(request.getCartItemId(),request.getQuantity());
		return new ResponseEntity<>(item,HttpStatus.OK);
	}
	
	@DeleteMapping("/cart-item/{id}/remove")
	public ResponseEntity<Cart> removeCartItem(@PathVariable Long id,@RequestHeader("Authorization") String jwt)throws Exception{
		Cart cart = cartServices.removeItemFromCart(id, jwt);
		return new ResponseEntity<>(cart,HttpStatus.OK);
	}
	
	@PutMapping("/cart/clear")
	public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String jwt)throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		Cart cart = cartServices.clearCart(user.getId());
		return new ResponseEntity<>(cart,HttpStatus.OK);
	}
	
	@GetMapping("/cart")
	public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt)throws Exception{
		User user = userService.findUserByJwtToken(jwt);
		Cart cart = cartServices.findCartByUserId(user.getId());
		return new ResponseEntity<>(cart,HttpStatus.OK);
	}
	
}

