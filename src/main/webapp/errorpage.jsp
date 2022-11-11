<%@ page isErrorPage="true" contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>SPOQ</title>
</head>
<body>
    <h1>Error</h1>
    <img src="img/hack.jpeg" alt="booty hack" width="300">
    <h4>Кажется, вы отправили некорректные данные</h4>
    <p style="color: red"><%=exception.getMessage()%></p>
</body>
</html>
