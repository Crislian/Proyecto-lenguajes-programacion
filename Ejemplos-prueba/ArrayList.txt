public class Main{
    public static void main(String[] args){
        ArrayList<Integer> ll = new ArrayList();
        for (int i = 0; i < 15; i++) {
            ll.add(i);
        }
        ll.add(5000, 4); // adds 5000 at 4 position
        ll.add(153, 10);
        ll.add(-550, 5);
        if(!ll.contains(53)){
            ll.add(53);
        }
        ll.add(ll.get(0) * 50);
        int index = ll.indexOf(53);
        if(ll.isEmpty()){
            ll.add(0);    
        } else {
            ll.add(ll.size());
        }
        ll.removeElement(53);
        ll.remove(0);
        ll.set(0, 1000); // sets 1000 at position 0
    }   
}