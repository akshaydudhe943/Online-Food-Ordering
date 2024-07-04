package com.akshay.request;

import lombok.Data;

@Data
public class UpdateCartitemRequest {
	private Long cartItemId;
	private int quantity;

}
