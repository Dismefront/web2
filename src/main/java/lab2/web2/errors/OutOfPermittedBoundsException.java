package lab2.web2.errors;

import lab2.web2.util.Coords;

public class OutOfPermittedBoundsException extends RuntimeException {

    private final String[] EXCEPTIONS = {
            "Value X must be between " + Coords.X_COORD_LEFT + " and " + Coords.X_COORD_RIGHT,
            "Value Y must be between " + Coords.Y_COORD_LEFT + " and " + Coords.Y_COORD_RIGHT,
            "Value R must be one of integer values between " + Coords.R_VALUE_LEFT +
                    " and " + Coords.R_VALUE_RIGHT
    };

    public enum EXCEPTION_TYPE {
        X, Y, R
    }

    private EXCEPTION_TYPE ex_type;

    public void setExceptionType(EXCEPTION_TYPE type) {
        ex_type = type;
    }

    @Override
    public String getMessage() {
        return EXCEPTIONS[ex_type.ordinal()];
    }
}
