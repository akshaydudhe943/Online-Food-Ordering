package com.akshay.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akshay.model.Address;
import com.akshay.model.Cart;
import com.akshay.model.CartItem;
import com.akshay.model.Order;
import com.akshay.model.OrderItem;
import com.akshay.model.Restaurant;
import com.akshay.model.User;
import com.akshay.repository.AddressRepository;
import com.akshay.repository.OrderItemRepository;
import com.akshay.repository.OrderRepository;
import com.akshay.repository.UserRepository;
import com.akshay.request.OrderRequest;

@Service
public class OrderServiceImpl implements OrderService {

	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	private AddressRepository addressRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private CartServices cartServices;
	
	@Override
	public Order createOrder(OrderRequest order, User user) throws Exception {

		Address shippingAddress = order.getDeliveryAddress();
		
		Address savedAddress = addressRepository.save(shippingAddress);
		
		if(!user.getAddresses().contains(savedAddress)) {
			user.getAddresses().add(savedAddress);
			userRepository.save(user);
		}
		
		Restaurant restaurant = restaurantService.findRestaurantById(order.getRestaurantId());
		
		Order createdOrder = new Order();
		createdOrder.setCustomer(user);
		createdOrder.setCreatedAt(new Date());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.setDeliveryAddress(savedAddress);
		createdOrder.setRestaurant(restaurant);
		
		Cart cart = cartServices.findCartByUserId(user.getId());
		
		List<OrderItem> orderItems = new ArrayList<>();
		for(CartItem cartItem : cart.getItem()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setFood(cartItem.getFood());
			orderItem.setIngredients(cartItem.getIngredients());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setTotalPrice(cartItem.getTotalPrice());
			
			OrderItem savedOrderItem = orderItemRepository.save(orderItem);
			orderItems.add(savedOrderItem);
		}
		Long totalPrice = cartServices.calculateCartTotal(cart);
		createdOrder.setItems(orderItems);
		createdOrder.setTotalPrice(totalPrice);
		
		Order savedOrder = orderRepository.save(createdOrder);
		
		restaurant.getOrders().add(savedOrder);
		
		return createdOrder;
	}

	@Override
	public Order updateOrder(Long orderId, String orderStatus) throws Exception {
		Order order = findOrderById(orderId);
		if(orderStatus.equals("OUT_FOR_DELIVERY") || orderStatus.equals("DELIVERED") || orderStatus.equals("COMPLETED") ||orderStatus.equals("PENDING")) {
			order.setOrderStatus(orderStatus);
			return orderRepository.save(order);
		}
		throw new Exception("Please Select a valid Order Status");
	}

	@Override
	public void clearOrder(Long orderld) throws Exception {
		orderRepository.deleteById(orderld);
	}

	@Override
	public List<Order> getUsersOrder(Long userld) throws Exception {
		return orderRepository.findByCustomerId(userld);
	}

	@Override
	public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception {
		List<Order> orders = orderRepository.findByRestaurantId(restaurantId);
		if(orderStatus!=null) {
			orders=orders.stream().filter(order->order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
		}
		return orders;
	}

	@Override
	public Order findOrderById(Long id) throws Exception {

		Optional<Order> optionalOrder = orderRepository.findById(id);
		if(optionalOrder.isEmpty()) {
			throw new Exception("Order not found with is "+id);
		}
		return optionalOrder.get();
	}

}
