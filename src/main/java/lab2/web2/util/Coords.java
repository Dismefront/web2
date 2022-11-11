package lab2.web2.util;

import lab2.web2.errors.OutOfPermittedBoundsException;
import lab2.web2.errors.WrongAttributesException;

public class Coords {

    public static final Double X_COORD_LEFT = -5d;
    public static final Double X_COORD_RIGHT = 3d;
    public static final Double Y_COORD_LEFT = -3d;
    public static final Double Y_COORD_RIGHT = 5d;
    public static final Double R_VALUE_LEFT = 1d;
    public static final Double R_VALUE_RIGHT = 5d;

    private Double x, y, r;

    public Coords(String x, String y, String r) {
        assertNull(x, y, r);
        this.x = Double.parseDouble(x);
        this.y = Double.parseDouble(y);
        this.r = Double.parseDouble(r);
    }

    public void assertNull(Object x, Object y, Object r) {
        if (x == null || y == null || r == null) {
            WrongAttributesException ex = new WrongAttributesException();
            ex.setExceptionName(
                    x == null ? "x" : y == null ? "y" : "r"
            );
            throw ex;
        }
    }

    public void assertPermittedValuesX() {
        if (x < X_COORD_LEFT || x > X_COORD_RIGHT) {
            OutOfPermittedBoundsException ex = new OutOfPermittedBoundsException();
            ex.setExceptionType(OutOfPermittedBoundsException.EXCEPTION_TYPE.X);
            throw ex;
        }
    }

    public void assertPermittedValuesY() {
        if (y <= Y_COORD_LEFT || y >= Y_COORD_RIGHT) {
            OutOfPermittedBoundsException ex = new OutOfPermittedBoundsException();
            ex.setExceptionType(OutOfPermittedBoundsException.EXCEPTION_TYPE.Y);
            throw ex;
        }
    }

    public void assertPermittedValuesR() {
        if ((r < R_VALUE_LEFT || r > R_VALUE_RIGHT)
                || r - Math.floor(r) != 0) {
            OutOfPermittedBoundsException ex = new OutOfPermittedBoundsException();
            ex.setExceptionType(OutOfPermittedBoundsException.EXCEPTION_TYPE.R);
            throw ex;
        }
    }

    public void assertPermittedValues() {
        assertPermittedValuesX();
        assertPermittedValuesY();
        assertPermittedValuesR();
    }

}
