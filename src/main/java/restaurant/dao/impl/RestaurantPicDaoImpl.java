package restaurant.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import restaurant.dao.RestaurantPicDAO;
import restaurant.vo.RestaurantPicVO;
import restaurant.vo.RestaurantVO;

import static common.util.JdbcUtil.*;

public class RestaurantPicDaoImpl implements RestaurantPicDAO{

	@Override
	public void insert(RestaurantPicVO restaurantPicVO) {
		String insert = "insert into restaurantPic(restaurantNo,restaurantPic,restaurantPicRemark)"
				+ "values(?,?,?)";
		
		try(Connection con = getConnection();
			PreparedStatement ps = con.prepareStatement(insert)){
			
			ps.setInt(1,restaurantPicVO.getrestaurantNo());
			ps.setBytes(2, restaurantPicVO.getrestaurantPic());
			ps.setString(3,restaurantPicVO.getrestaurantPicRemark());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

	@Override
	public void update(RestaurantPicVO restaurantPicVO) {
		String update = "update restaurantPic"
				+ "set restaurantPic = ? ,restaurantPicRemark = ?"
				+ "where restaurantPicNo = ?;";
		
		try(Connection con = getConnection();
				PreparedStatement ps = con.prepareStatement(update)){
				
				ps.setBytes(1,restaurantPicVO.getrestaurantPic());
				ps.setString(2,restaurantPicVO.getrestaurantPicRemark());
				ps.setInt(3,restaurantPicVO.getrestaurantPicNo());
				
				ps.executeUpdate();
				
			} catch (Exception e) {
				e.printStackTrace();
			}
	}

	@Override
	public void delete(Integer restaurantPicNo) {
		String delete = "delete from restaurantPic"
				+ "where restaurantPicNo = ?";
		
		try(Connection con = getConnection();
			PreparedStatement ps = con.prepareStatement(delete)){
				
				ps.setInt(1,restaurantPicNo);
				ps.executeUpdate();
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
	}

	@Override
	public RestaurantPicVO findByPrimaryKey(Integer restaurantPicNo) {
		String findByPrimaryKey = "select * from restaurant where restaurantPicNo = ?";
		RestaurantPicVO vo = null;
		try(Connection con = getConnection();
			PreparedStatement ps = con.prepareStatement(findByPrimaryKey);
			ResultSet rs = ps.executeQuery()){
			
			ps.setInt(1, restaurantPicNo);
			while(rs.next()) {
				vo = new RestaurantPicVO();
				
				vo.setrestaurantPicNo(rs.getInt(1));
				vo.setrestaurantNo(rs.getInt(2));
				vo.setrestaurantPic(rs.getBytes(3));
				vo.setrestaurantPicRemark(rs.getString(4));
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return vo;
	}



	@Override
	public List<RestaurantPicVO> findByRestaurantNo(Integer restaurantNo) {
		String findByRestaurantNo = "select * from restaurantPic"
				+ "where restaurantNo = ?";
		
		List<RestaurantPicVO> list = new ArrayList<>();
		
		try (Connection con = getConnection();
				PreparedStatement ps = con.prepareStatement(findByRestaurantNo);
				ResultSet rs = ps.executeQuery()){
			while (rs.next()) {
				RestaurantPicVO vo = new RestaurantPicVO();
				
				vo.setrestaurantPicNo(rs.getInt(1));
				vo.setrestaurantNo(rs.getInt(2));
				vo.setrestaurantPic(rs.getBytes(3));
				vo.setrestaurantPicRemark(rs.getString(4));
				
				list.add(vo);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}