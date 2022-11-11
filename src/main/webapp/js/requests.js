request = (coords) => {
    $.get(
        "./controller",
        {
            "x": coords.x,
            "y": coords.y,
            "r": coords.r
        },
        function (resp) {
            addHtmlTableResult(
                resp.number,
                resp.result,
                resp.x,
                resp.y,
                resp.r,
                resp.ex_time,
                resp.cur_time
            )
            board.create('point', [parseFloat(resp.x), parseFloat(resp.y)],
                    {fixed: true, size: 1, name: resp.number});
            tabledata.push(
                [resp.number, resp.result, resp.x, resp.y, resp.r, resp.ex_time, resp.cur_time]
            );
        },
        "json"
    );
}

clearRequest = () => {
    $.ajax({
        url: "./controller",
        type: "delete",
        data: { clearFlag: 1 },
        success() {
            clearTable();
            tabledata = []
        }
    });
}