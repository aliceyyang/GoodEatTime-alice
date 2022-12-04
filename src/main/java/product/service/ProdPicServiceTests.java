package product.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;

import common.connection.HibernateUtil;

public class ProdPicServiceTests {
	private static ProdPicService prodPicService = new ProdPicService();
	
	public static void main(String[] args) {
		SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
		Session session = sessionFactory.getCurrentSession();
		Transaction transaction = session.beginTransaction();
		
		// 測試新增
//		try (InputStream in = Files.newInputStream(Path.of("C:\\GoodEatTime\\Workspace\\GoodEatTime\\src\\main\\webapp\\Front_End\\img\\shop\\product-7.jpg"))){
//			byte[] bytes = new byte[in.available()];
//			in.read(bytes);
//			prodPicService.addProdPic(3, bytes, "測試service新增");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		
		// 測試修改
//		try (InputStream in = Files.newInputStream(Path.of("C:\\GoodEatTime\\Workspace\\GoodEatTime\\src\\main\\webapp\\Front_End\\img\\shop\\product-5.jpg"))){
//			byte[] bytes = new byte[in.available()];
//			in.read(bytes);
//			prodPicService.updateProdPic(11, 5, bytes, "測試service修改");
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
		
		// 測試刪除
//		System.out.println(prodPicService.deleteProdPic(11));
		
		// 測試取得單一張圖片
//		System.out.println(prodPicService.getOneProdPic(5));
		
		// 測試取得全部
//		System.out.println(prodPicService.getAll());
		
		// 測試透過商品編號查找
//		System.out.println(prodPicService.findByProdNo(3));
		
		transaction.commit();
		session.close();
		HibernateUtil.closeSessionFactory();
	}

}
