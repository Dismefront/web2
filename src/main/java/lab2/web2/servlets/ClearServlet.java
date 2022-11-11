package lab2.web2.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lab2.web2.util.DataBean;

import java.io.IOException;

@WebServlet(name = "clear", value = "clear")
public class ClearServlet extends HttpServlet {

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        DataBean data = (DataBean) req.getSession().getAttribute("data");
        if (data != null) {
            data.getData().clear();
        }
    }

}
