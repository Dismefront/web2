let board;
initBoard();

function setPointsWithRadius(R) {
    tabledata.forEach((row) => {
        if (row[4] === R.toString())
            board.create('point', [parseFloat(row[2]), parseFloat(row[3])],
                {fixed: true, size: 1, name: row[0]});
    });
}

$("input[name='Rchange']").click(function() {
    let value_clicked = parseInt($(this).attr("value"), 10);
    DrawBatmanFunction(value_clicked);
});

function getMouseCoords(e) {
    let cPos = board.getCoordsTopLeftCorner(e),
        absPos = JXG.getPosition(e),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
}

function initBoard() {
    if (board)
        JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard(
        "board",
        { boundingbox: [-5, 5, 5, -5], axis: true, showNavigation: false}
    );

    board.on("down", (e) => {
        let r_obj = $("input[name='Rchange']:checked");
        if (r_obj.length === 0)
            return;
        let coords = getMouseCoords(e);
        c1 = coords.usrCoords[1].toFixed(3);
        c2 = coords.usrCoords[2].toFixed(3);

        if (c1 < -5 || c1 > 3 || c2 <= -3 || c2 >= 5) {
            if ($("#bounds_error").length === 0)
                $("#board").after("<p id='bounds_error' style='color: red'>out of bounds</p>");
            return;
        }
        else
            $("#bounds_error").remove();

        request({
            x: c1,
            y: c2,
            r: r_obj.val()
        })
    });
}

function DrawBatmanFunction(R, cleared=false) {
    let x_ax = R;
    let y_ax = R / 2;

    initBoard();
    if (!cleared)
        setPointsWithRadius(R);

    const drawWings = () => {
        board.create(
            'functiongraph', [
                x => ((y_ax ** 2 * (x_ax ** 2 - x ** 2) / x_ax ** 2) ** 0.5),
                y_ax, x_ax
            ], {strokeWidth: 2});
        board.create(
            'functiongraph', [
                x => -((y_ax ** 2 * (x_ax ** 2 - x ** 2) / x_ax ** 2) ** 0.5),
                y_ax, x_ax
            ], {strokeWidth: 2});
        board.create(
            'functiongraph', [
                x => -((y_ax ** 2 * (x_ax ** 2 - x ** 2) / x_ax ** 2) ** 0.5),
                -x_ax, -y_ax
            ], {strokeWidth: 2});
        board.create(
            'functiongraph', [
                x => ((y_ax ** 2 * (x_ax ** 2 - x ** 2) / x_ax ** 2) ** 0.5),
                -x_ax, -y_ax
            ], {strokeWidth: 2});
    }

    let temp = -((y_ax ** 2 * (x_ax ** 2 - y_ax ** 2) / x_ax ** 2) ** 0.5);
    let trd = R / 5;

    const drawTail = () => {
        board.create(
            'ellipse', [
                [y_ax - R / 8, temp + trd], [y_ax - R / 8, temp - trd], [y_ax, temp],
                0.17916 * Math.PI, 1.77 * Math.PI
            ], {strokeWidth: 2})
        board.create(
            'ellipse', [
                [y_ax - 3 * R / 8 + R / 16, temp + trd], [y_ax - 3 * R / 8 - R / 16, temp - trd], [y_ax - R / 4, temp],
                0.29 * Math.PI, 1.85 * Math.PI
            ], {strokeWidth: 2})
        board.create(
            'ellipse', [
                [-y_ax + R / 8, temp + trd], [-y_ax + R / 8, temp - trd], [-y_ax, temp],
                0.25 * Math.PI, 1.82 * Math.PI
            ], {strokeWidth: 2})
        board.create(
            'ellipse', [
                [-y_ax + 3 * R / 8 - R / 16, temp + trd], [-y_ax + 3 * R / 8 + R / 16, temp - trd], [-y_ax + R / 4, temp],
                0.15 * Math.PI, 1.7 * Math.PI
            ], {strokeWidth: 2})
    }

    const drawHead = () => {
        board.create(
            'ellipse', [
                [-y_ax + 3 * R / 16, -temp + trd], [-y_ax + 3 * R / 16, -temp - trd], [-y_ax, -temp],
                -0.24 * Math.PI, 0.24 * Math.PI
            ], {strokeWidth: 2})
        board.create(
            'ellipse', [
                [y_ax - 3 * R / 16, -temp + trd], [y_ax - 3 * R / 16, -temp - trd], [y_ax, -temp],
                -0.24 * Math.PI, 0.24 * Math.PI
            ], {strokeWidth: 2})
        board.create(
            'segment', [
                [-R / 8, -temp], [-R / 16, -temp - R / 5]
            ], {strokeWidth: 2, fixed: true});
        board.create(
            'segment', [
                [R / 8, -temp], [R / 16, -temp - R / 5]
            ], {strokeWidth: 2, fixed: true});
        board.create(
            'segment', [
                [-R / 16, -temp - R / 5], [R / 16, -temp - R / 5]
            ], {strokeWidth: 2, fixed: true});
    }


    drawWings();
    drawTail();
    drawHead();

}
