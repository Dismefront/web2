const x_valid = () => {
    let x_coord = parseInt($("input[name='Xchange']:checked").val());
    const allowedX = new Array();
    for (let i = -5; i <= 3; i++) {
        allowedX.push(i);
    }
    if (x_coord == null || isNaN(x_coord) || !allowedX.includes(x_coord)) {
        // alert("координата X введена некорректно");
        return false;
    }
    return true;
}

const y_valid = () => {
    let y_coord = parseFloat($("input[name='Ycoord']").val());
    if (y_coord == null || isNaN(y_coord) || y_coord <= -3 || y_coord >= 5) {
        // alert("координата Y введена некорректно");
        return false;
    }
    return true;
}

const r_valid = () => {
    let Radius = parseInt($("input[name='Rchange']:checked").val());
    const allowedR = new Array();
    for (let i = 1; i <= 5; i += 1) {
        allowedR.push(i);
    }
    if (Radius == null || isNaN(Radius) || !allowedR.includes(Radius)) {
        // alert("Radius введен некорректно");
        return false;
    }
    return true;
}

$("#y_coord").on("input", (event) => {
    y_coord = event.target.value;
    if (y_coord == null || isNaN(y_coord) || y_coord <= -3 || y_coord >= 5)
        event.target.setCustomValidity("Enter the number between -3 and 5");
    else
        event.target.setCustomValidity("");
});

const ERROR_MESSAGE = "(does not satisfy)"
const X_COORDINATE = "X-coordinate";
const Y_COORDINATE = "Y-coordinate";
const R_VALUE = "R-value";

const setMessage = (message, header, status) => {
    $(status).html(header + " <span style='color: red'>" + message + "</span>");
}

const updateErrors = () => {
    let x = x_valid();
    let y = y_valid();
    let r = r_valid();
    setMessage(x ? "" : ERROR_MESSAGE, X_COORDINATE, "#x_status");
    setMessage(y ? "" : ERROR_MESSAGE, Y_COORDINATE, "#y_status");
    setMessage(r ? "" : ERROR_MESSAGE, R_VALUE, "#r_status");
    return x && y && r;
}

$("form[name='form']").on("reset", () => {
    setMessage("", X_COORDINATE, "#x_status");
    setMessage("", Y_COORDINATE, "#y_status");
    setMessage("", R_VALUE, "#r_status");
    initBoard();
});

$("form[name='form']").on("submit", () => {
    let ok = updateErrors();
    if (ok) {
        data = {
            x: $("input[name='Xchange']:checked").val(),
            y: $("input[name='Ycoord']").val(),
            r: $("input[name='Rchange']:checked").val()
        }
        request(data);
    }
});