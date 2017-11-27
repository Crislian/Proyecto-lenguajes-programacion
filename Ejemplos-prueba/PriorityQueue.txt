public class Main{
    public static void main(String[] args){
        PriorityQueue<Integer> ipq = new PriorityQueue<>();
        ipq.add(5);
        ipq.add(1);
        ipq.add(51);
        ipq.add(132);
        ipq.add(-123);
        ipq.add(242124);
        PriorityQueue<Character> cpq = new PriorityQueue<>();
        cpq.add('c');
        cpq.add('a');
        cpq.add('d');
        cpq.add('z');
        cpq.add('a');
        cpq.add('b');
        cpq.add('x');
        cpq.add('y');
        cpq.add('p');
        char peek = cpq.peek();
        peek = cpq.poll();
        while(cpq.size() > 0){
            cpq.poll();   
        }
    }   
}
