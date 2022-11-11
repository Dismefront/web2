package lab2.web2.util;

import java.io.Serializable;
import java.util.ArrayList;

public class DataBean implements Serializable {

    private ArrayList<ArrayList<String>> data;

    public DataBean() {
        data = new ArrayList<>();
    }

    public ArrayList<ArrayList<String>> getData() {
        return data;
    }

    public void setData(ArrayList<ArrayList<String>> data) {
        this.data = data;
    }

}
