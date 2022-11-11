$("#clearbtn").on("click", () => {
    clearRequest();
    let val = $("input[name='Rchange']:checked").val();
    if (val !== undefined)
        DrawBatmanFunction(parseInt(val), true);
});

addHtmlTableResult = (n, res, x, y, r, ex_time, cur_time) => {
    res_row = res === "HIT"
        ? "<td style='background-color: green'>" + res + "</td>"
        : "<td style='background-color: red'>" + res + "</td>"

    let row = "<tr>" +
        "<th>" + n + "</th>" +
        res_row +
        "<td>" + x + "</td>" +
        "<td>" + y + "</td>" +
        "<td>" + r + "</td>" +
        "<td>" + ex_time + " millsec </td>" +
        "<td>" + cur_time + "</td>" +
        "</tr>";
    $("table[name='result'] tr:first").after(row);
}

clearTable = () => {
    $("table[name='result'] tr:gt(0)").remove();
}