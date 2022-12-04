package product.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.util.List;

import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import product.service.ProdCategoryService;
import product.vo.ProdCategoryVO;
import reservation.dao.ReserveTimeDao;
import reservation.dao.impl.ReserveTimeDaoImpl;
import reservation.vo.ReserveTimeVO;


@WebServlet("/TestJson")
public class TestJson extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
    public TestJson() {
        super();
    }

	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
//		res.setContentType("application/json;charset=UTF-8");
//		res.addHeader("Access-Control-Allow-Origin", "*");
//		PrintWriter out = res.getWriter();
//		List<ProdCategoryVO> list = new ProdCategoryService().getAll();
//		Gson gson = new Gson();
//		String jsonStr = gson.toJson(list);
//		out.print(jsonStr);
//		System.out.println("Object to JSON: " + jsonStr);
		
		String input = "["
				+ "{'reserveTime':'12:00', 'allowReserveNum': 1},"
				+ "{'reserveTime':'13:00', 'allowReserveNum': 2},"
				+ "{'reserveTime':'18:00', 'allowReserveNum': 3},"
				+ "{'reserveTime':'19:00', 'allowReserveNum': 3}"
				+ "]";
		try {
			ReserveTimeDao dao = new ReserveTimeDaoImpl();
			Gson gson = new Gson();
			ReserveTimeVO[] target = gson.fromJson(input, ReserveTimeVO[].class);
			for(ReserveTimeVO r : target) {
				r.setRestaurantNo(1);
				r.setWeekDay(0);
				dao.insert(r);
				System.out.println(r);
			}
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
