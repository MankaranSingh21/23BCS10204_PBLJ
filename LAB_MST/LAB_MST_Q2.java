import java.util.*;

class EmployeeNotFoundException extends Exception {
    public EmployeeNotFoundException(String msg) {
        super(msg);
    }
}
public class Main {
    Map<Integer, String> mp = new HashMap<>();

    public void addEmployee(int id, String name) {
        mp.put(id, name);
    }

    public String retrieve(int id) throws EmployeeNotFoundException {
        if (!mp.containsKey(id)) {
            throw new EmployeeNotFoundException("Employee with id = " + id + " not found");
        }
        return mp.get(id);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Main ob = new Main();

        ob.addEmployee(1, "Tanisha");
        ob.addEmployee(2, "Tarun");
        ob.addEmployee(3, "Pankaj");

        System.out.print("Enter Employee ID to search: ");
        int id = sc.nextInt();

        try {
            String name = ob.retrieve(id);
            System.out.println("Employee Found: " + name);
        } catch (EmployeeNotFoundException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
