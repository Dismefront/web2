package lab2.web2.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lab2.web2.errors.OutOfPermittedBoundsException;
import lab2.web2.errors.WrongAttributesException;
import lab2.web2.util.Coords;

import java.io.IOException;

@WebServlet(name="Controller", urlPatterns = "/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        int clearFlag = Integer.parseInt(req.getParameter("clearFlag"));
        if (clearFlag == 1)
            req.getRequestDispatcher("clear").forward(req, resp);
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        long startTime = System.nanoTime();

        resp.setContentType("application/json");

        //validation logic

        String x = req.getParameter("x");
        String y = req.getParameter("y");
        String r = req.getParameter("r");

        Coords coords = new Coords(x, y, r);
        coords.assertPermittedValues();

        req.setAttribute("x", x);
        req.setAttribute("y", y);
        req.setAttribute("r", r);
        req.setAttribute("beginTime", startTime);
        req.getRequestDispatcher("areacheck").forward(req, resp);

    }

}
