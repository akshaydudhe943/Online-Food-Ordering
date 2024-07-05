package com.akshay.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.akshay.model.Order;
import com.akshay.model.User;
import com.akshay.request.OrderRequest;

@Service
public interface OrderService {

	public Order createOrder(OrderRequest request,User user)throws Exception;
	
	public Order updateOrder(Long orderId, String orderStatus)throws Exception;
	
	public void clearOrder(Long orderld) throws Exception;
	
	public List<Order> getUsersOrder(Long userld) throws Exception;
	
	public List<Order> getRestaurantsOrder(Long restaurantId,String orderStatus) throws Exception;
	
	public Order findOrderById(Long id)throws Exception;
}
