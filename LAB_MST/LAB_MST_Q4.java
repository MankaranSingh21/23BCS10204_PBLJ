class T1 extends Thread {
    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println("Number: " + i);
        }
    }
}

class T2 extends Thread {
    public void run() {
        for (int i = 1; i <= 10; i++) {
            System.out.println("Square of " + i + ": " + (i * i));
        }
    }
}

public class Main {
    public static void main(String[] args) {
        T1 thread1 = new T1();
        T2 thread2 = new T2();

        thread1.start();
        thread2.start();
    }
}
