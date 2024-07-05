package com.akshay.request;

import com.akshay.model.Address;

import lombok.Data;

@Data
public class OrderRequest {

	private Long restaurantId;
	private Address deliveryAddress;
}
