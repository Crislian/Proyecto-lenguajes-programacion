public class Main{
	public static void main(String[] args){
		Queue<Double> q = new LinkedList<>(); 
        q.offer(1.0);
        q.offer(1.2);
        q.offer(123123.234);
        double value = q.peek();
        double top = q.poll();        
	}	
}