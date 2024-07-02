package com.akshay.dto;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Embeddable
public class RestaurantDto {

	private Long id;
	
	private String title;
	
	@Column(length=1000)
	private List<String> images;
	
	private String description;
	

}
