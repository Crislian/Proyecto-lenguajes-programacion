public class Main{
	public static void main(String[] args){
	    ArrayList<Integer> l = new ArrayList<>();
	    l.add(5);
	    l.add(1);
	    l.add(121);
	    l.add(2);
	    l.add(3);
	    l.add(12341);
	    l.add(123);
	    l.add(-1);
	    l.add(10);
	    l.add(1543);
        l.contains(1543);
	    int temp = l.size();
        for (int x=0; x < l.size(); x++) {
            for (int i=0; i < l.size() - x - 1; i++) {
                if (l.get(i) > l.get(i+1)){
                    temp = l.get(i);
                    l.set(i,l.get(i+1) );
                    l.set(i+1, temp);
                }
            }               
        }
	}	
}