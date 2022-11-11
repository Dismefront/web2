package lab2.web2.errors;

public class WrongAttributesException extends RuntimeException {

    private String ExceptionName = "value";

    public void setExceptionName(String exceptionName) {
        ExceptionName = exceptionName;
    }

    @Override
    public String getMessage() {
        return "The value \"" + ExceptionName + "\" is unfound";
    }
}
