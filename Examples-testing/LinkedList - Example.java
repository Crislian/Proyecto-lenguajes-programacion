public class Main{
    public static void main(String[] args){
        LinkedList<Integer> ll = new LinkedList();
        for (int i = 0; i < 15; i++) {
            if (i % 2 == 0) {
                ll.addFirst(i);
            } else {
                ll.addLast(i);
            }
        }
        int last = ll.getLast();
        int first = ll.getFirst();
        ll.removeFirst();
        ll.remove(3);
        ll.removeLast();
        int p = ll.peek();
        int pop = ll.pop();
    }   
}
