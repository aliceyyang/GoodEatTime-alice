<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>餐廳圖片上傳</title>
</head>
<body>
	<form action="restaurant/UploadPic" method="post" enctype="multipart/form-data">
		<input type="file" name="file">
		<input type="submit">
	</form>

</body>
</html>