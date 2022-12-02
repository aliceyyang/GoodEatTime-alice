package restaurant.vo;

import java.io.Serializable;
import java.util.Arrays;

public class RestaurantPicVO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Integer restaurantPicNo;
	private Integer restaurantNo;
	private byte[] restaurantPic;
	private String restaurantPicRemark;
	
	public RestaurantPicVO() {
		
	}

	@Override
	public String toString() {
		return "RestaurantPicVo [restaurantPicNo=" + restaurantPicNo + ", restaurantNo=" + restaurantNo
				+ ", restaurantPic=" + Arrays.toString(restaurantPic) + ", restaurantPicRemark=" + restaurantPicRemark
				+ "]";
	}
	

	public Integer getrestaurantPicNo() {
		return restaurantPicNo;
	}

	public void setrestaurantPicNo(Integer restaurantPicNo) {
		this.restaurantPicNo = restaurantPicNo;
	}

	public Integer getrestaurantNo() {
		return restaurantNo;
	}

	public void setrestaurantNo(Integer restaurantNo) {
		this.restaurantNo = restaurantNo;
	}

	public byte[] getrestaurantPic() {
		return restaurantPic;
	}

	public void setrestaurantPic(byte[] restaurantPic) {
		this.restaurantPic = restaurantPic;
	}

	public String getrestaurantPicRemark() {
		return restaurantPicRemark;
	}

	public void setrestaurantPicRemark(String restaurantPicRemark) {
		this.restaurantPicRemark = restaurantPicRemark;
	}

	
}