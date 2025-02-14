package com.tibame.tga104.restaurant.service.impl;

import java.util.List;

import com.tibame.tga104.restaurant.dao.RestaurantDao;
import com.tibame.tga104.restaurant.dao.RestaurantSpringDAO;
import com.tibame.tga104.restaurant.dao.impl.RestaurantDaoImpl;
import com.tibame.tga104.restaurant.dto.RestaurantRequest;
import com.tibame.tga104.restaurant.service.RestaurantService;
import com.tibame.tga104.restaurant.vo.RestaurantVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.Column;

@Component
public class RestaurantServiceImpl implements RestaurantService {
	
	@Autowired
	private RestaurantSpringDAO restaurantSpringDAO;
	
	@Autowired
	private RestaurantDao dao;
	
	
	@Override
	public List<RestaurantVO> getAll() {
		return dao.getAll();
	}

	@Override
	public boolean addRestaurant(RestaurantVO restaurantVO) {	
		
		return dao.insert(restaurantVO);
	}

	@Override
	public RestaurantVO updateRestaurant(String restaurantTel, String restaurantName,
			String restaurantTaxIDNo, String restaurantAccountInfo, String restaurantBusinessHour,
			String restaurantAddr,String restaurantAccount, String restaurantPassword,
			Integer restaurantNO) {
		
		RestaurantVO vo = new RestaurantVO();
		
		vo.setRestaurantTel(restaurantTel);
		vo.setRestaurantName(restaurantName);
		vo.setRestaurantTaxIDNo(restaurantTaxIDNo);
		vo.setRestaurantAccountInfo(restaurantAccountInfo);
		vo.setRestaurantBusinessHour(restaurantBusinessHour);
		vo.setRestaurantAddr(restaurantAddr);
		vo.setRestaurantAccount(restaurantAccount);
		vo.setRestaurantPassword(restaurantPassword);
		vo.setRestaurantNo(restaurantNO);
		
		dao.update(vo);
		
		return vo;
	}

	@Override
	public void setStatus(Integer restaurantNo,Boolean restaurantStatus){
			dao.setStatus(restaurantNo, restaurantStatus);
	}


	@Override
	public RestaurantVO getOneRestaurant(Integer restaurantNo) {
		return dao.findByPrimaryKey(restaurantNo);
	}




	@Override // written by Alice
	public List<RestaurantVO> getRestaurantByAll() {
		return restaurantSpringDAO.getRestaurantByAll();
	}

	@Override // written by Alice
	public RestaurantVO getRestaurantByNo(Integer restaurantNo) {
		return restaurantSpringDAO.getRestaurantByNo(restaurantNo);
	}

	@Override // written by Alice
	public void updateRestaurantByNo(Integer restaurantNo, RestaurantRequest restaurantRequest) {
		restaurantSpringDAO.updateRestaurantByNo(restaurantNo, restaurantRequest);
	}


}
