
class NumberPrinter {
    private int number = 1;
    private final int MAX = 15;

    public synchronized void printOdd() throws InterruptedException {
        while (number <= MAX) {
            while (number % 2 == 0) {
                wait();
            }
            if (number > MAX) break;
            System.out.println(Thread.currentThread().getName() + ": " + number);
            number++;
            notifyAll();
        }
    }

    public synchronized void printEven() throws InterruptedException {
        while (number <= MAX) {
            while (number % 2 == 1) {
                wait();
            }
            if (number > MAX) break;
            System.out.println(Thread.currentThread().getName() + ": " + number);
            number++;
            notifyAll();
        }
    }
}

class OddPrinter implements Runnable {
    private final NumberPrinter printer;
    OddPrinter(NumberPrinter printer) { this.printer = printer; }

    @Override
    public void run() {
        try {
            printer.printOdd();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class EvenPrinter implements Runnable {
    private final NumberPrinter printer;
    EvenPrinter(NumberPrinter printer) { this.printer = printer; }

    @Override
    public void run() {
        try {
            printer.printEven();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}

class PBLJRunner {
    public static void main(String[] args) throws InterruptedException {
        NumberPrinter printer = new NumberPrinter();
        Thread oddThread = new Thread(new OddPrinter(printer), "Odd");
        Thread evenThread = new Thread(new EvenPrinter(printer), "Even");

        oddThread.start();
        evenThread.start();

        oddThread.join();
        evenThread.join();
    }
}