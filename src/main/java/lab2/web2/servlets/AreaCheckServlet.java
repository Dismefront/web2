package lab2.web2.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lab2.web2.util.CheckLigmaBollocksBatman;
import lab2.web2.util.DataBean;

import java.io.IOException;
import java.util.*;

@WebServlet(name="AreaCheck", urlPatterns = "areacheck")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String ans_x = (String) req.getAttribute("x");
        String ans_y = (String) req.getAttribute("y");
        String ans_r = (String) req.getAttribute("r");
        double x = Double.parseDouble(ans_x);
        double y = Double.parseDouble(ans_y);
        double r = Double.parseDouble(ans_r);
        long startTime = (Long) req.getAttribute("beginTime");

        CheckLigmaBollocksBatman batman = new CheckLigmaBollocksBatman(x, y, r);

        String result = batman.getResult() ? "HIT" : "MISS";
        String ex_time = String.format("%.3f", ((System.nanoTime() - startTime) / 1000.0));
        String cur_time = new Date().toString();
        DataBean data = (DataBean) req.getSession().getAttribute("data");
        int experiment_number = 1;
        if (data != null) {
            // calculating number of the current experiment in table and saving result to Beans
            if (data.getData().size() != 0)
                experiment_number = Integer.parseInt(data.getData().get(data.getData().size() - 1).get(0)) + 1;
            data.getData().add(new ArrayList<>(
                    Arrays.asList(Integer.toString(experiment_number),
                            result, ans_x, ans_y, ans_r, ex_time, cur_time))
            );
        }

        Map<String, String> mp = new HashMap<>();
        mp.put("number", Integer.toString(experiment_number));
        mp.put("result", result);
        mp.put("ex_time", ex_time);
        mp.put("cur_time", cur_time);
        mp.put("x", ans_x);
        mp.put("y", ans_y);
        mp.put("r", ans_r);
        ObjectMapper om = new ObjectMapper();

        resp.getWriter().println(om.writeValueAsString(mp));
    }
}
