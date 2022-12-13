package com.tibame.tga104.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tibame.tga104.product.dao.ShoppingCartDAO;
import com.tibame.tga104.product.vo.ShoppingCartVO;

@Service
public class ShoppingCartService {
	@Autowired
	private ShoppingCartDAO dao;
	
	@Transactional
	public ShoppingCartVO insert(ShoppingCartVO shoppingCartVO) {
		if (shoppingCartVO != null && shoppingCartVO.getMemberNo() != null
				&& shoppingCartVO.getProdNo() != null && shoppingCartVO.getProdQty() != null) {
			ShoppingCartVO temp = dao.findByPrimaryKey(shoppingCartVO.getMemberNo(), shoppingCartVO.getProdNo());
			if (temp == null) {
				return dao.insert(shoppingCartVO);
			}
		}
		return null;
	}
	
	@Transactional
	public ShoppingCartVO update(ShoppingCartVO shoppingCartVO) {
		if (shoppingCartVO != null && shoppingCartVO.getMemberNo() != null
				&& shoppingCartVO.getProdNo() != null && shoppingCartVO.getProdQty() != null) {
			ShoppingCartVO temp = dao.findByPrimaryKey(shoppingCartVO.getMemberNo(), shoppingCartVO.getProdNo());
			if (temp != null) {
				return dao.update(shoppingCartVO);
			}
		}
		return null;
	}
	
	@Transactional
	public boolean delete(Integer memberNo, Integer prodNo) {
		if (memberNo != null && prodNo != null) {
			ShoppingCartVO temp = dao.findByPrimaryKey(memberNo, prodNo);
			if (temp != null) {
				return dao.delete(memberNo, prodNo);
			}
		}
		return false;
	}
	
	public ShoppingCartVO findByPrimaryKey(Integer memberNo, Integer prodNo) {
		if (memberNo != null && prodNo != null) {
			return dao.findByPrimaryKey(memberNo, prodNo);
		}
		return null;
	}
	
	public List<ShoppingCartVO> getAll() {
		return dao.getAll();
	}
	
	public List<ShoppingCartVO> findByMemberNo(Integer memberNo) {
		if (memberNo != null) {
			return dao.findByMemberNo(memberNo);
		}
		return null;
	}
}
