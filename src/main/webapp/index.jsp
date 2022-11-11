<%@ page import="java.util.ArrayList" %>
<%@ page import="lab2.web2.util.DataBean" %>
<%@ page import="java.util.ListIterator" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<html>
<head>
    <title>SPOQ</title>

    <link rel="icon" href="img/icon.png">

    <!-- styles -->
    <link rel="stylesheet" type="text/css" href="styles/styles.css">
    <link rel="stylesheet" type="text/css" href="styles/result_styles.css">
    <!-- styles -->

    <!-- JQuery library -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- JQuery library -->

    <!-- jsxGraph library -->
    <script type="text/javascript" charset="UTF-8" src="js/jsxGraph/jsxgraphcore.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/jsxGraph/jsxGraph.css" />
    <!-- jsxGraph library -->

</head>
<body>
<table width="100%" border="1" cellspacing="0" frame="above" name="main">
    <th colspan="100%">Erik Romaikin P32091-44</th>
    <tr>

        <td width="50%" id="choice">
                <form name="form" onsubmit="return false">

                <p id="x_status">X-coordinate</p>
                <%
                    for (int i = -5; i <= 3; i++) {
                %>
                    <input type="radio" name="Xchange" value=<%=i%> required>
                <label> <%=i%> </label>
                <%}%>

                <p id="y_status">Y-coordinate</p>
                <input type="text" class="textinput" id="y_coord" name="Ycoord" placeholder="value (-3...5)">

                <p id="r_status">R-value</p>
                <% for (int i = 1; i <= 5; i++) { %>
                <input type="radio" name="Rchange" value=<%=i%> required>
                <label> <%=i%> </label>
                <%}%><br>

                <button type="submit" class="btn hvr-grow" id="submbtn">Submit</button>
                <button type="reset" class="btn resetbtn hvr-grow" id="resbtn">Reset</button>
                <button type="button" class="btn clearbtn hvr-grow" id="clearbtn">Clear</button>
            </form>
        </td>

        <td width="50%" class="table-alignment">
            <div id="board" class="jxgbox" style="width: 300px; height: 300px"></div>
            <p style="font-size: 12px">*Batman function appears as soon as you choose the radius to work with</p>
        </td>

    </tr>
</table>

<%!
    public static String getArrayString(ArrayList<ArrayList<String>> arr) {
        String res = "[";
        for (ArrayList<String> i : arr) {
            res += "[\"";
            res += String.join("\", \"", i);
            res += "\"]";
            if (!i.get(0).equals(Integer.toString(arr.size())))
                res += ", ";
        }
        res += "]";
        return res;
    }
%>>

<table name="result">
    <tr>
        <th>№</th>
        <th>Result</th>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Execution time</th>
        <th width="250px">Current time</th>
    </tr>
    <jsp:useBean id="data" class="lab2.web2.util.DataBean" scope="session"/>
    <%
        request.setAttribute("data", data);
        ListIterator<ArrayList<String>> row = data.getData().listIterator(data.getData().size());
        while(row.hasPrevious()) {
            ArrayList<String> rowdata = row.previous();

            out.println("<tr>");
            out.println("<th>" + rowdata.get(0) + "</th>");
            out.println(rowdata.get(1).equals("HIT") ?
                    "<td style='background-color: green'>HIT</td>" :
                    "<td style='background-color: red'>MISS</td>");
            out.println("<td>" + rowdata.get(2) + "</td>");
            out.println("<td>" + rowdata.get(3) + "</td>");
            out.println("<td>" + rowdata.get(4) + "</td>");
            out.println("<td>" + rowdata.get(5) + " millsec</td>");
            out.println("<td>" + rowdata.get(6) + "</td>");
            out.println("</tr>");
        }%>
</table>

    <script>
        let tabledata = <%=getArrayString(data.getData())%>
    </script>

    <!-- scripts -->
    <script type="text/javascript" src="js/graph.js"></script>
    <script type="text/javascript" src="js/validation.js"></script>
    <script type="text/javascript" src="js/requests.js"></script>
    <script type="text/javascript" src="js/table.js"></script>
    <!-- scripts -->

</body>
</html>