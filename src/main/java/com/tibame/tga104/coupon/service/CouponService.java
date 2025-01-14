package com.tibame.tga104.coupon.service;

import java.util.List;

import com.tibame.tga104.coupon.vo.CouponVO;

public interface CouponService {

	void deleteCoupon(Integer couponNo);

	CouponVO getOneCoupon(Integer couponNo);

	List<CouponVO> getAll();
	
	CouponVO insertCoupon(CouponVO couponVO);

	CouponVO updateCoupon(CouponVO couponVO);
	
	List<CouponVO> findByRestaurantNo(Integer restaurantNo);
	
	CouponVO insertByRestaurantNo(Integer restaurantNo);
	
	List<CouponVO> getAllcouponPic();
}
