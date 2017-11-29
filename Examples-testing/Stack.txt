public class Main{
	public static void main(String[] args){
		Stack<Double> stk = new Stack<>();
        int i = 0, n = 10;
        do{
            stk.push(i*1.1);
            i++;
        }while(i < n);
        
        if(!stk.empty()){
        	stk.push(11231.123131);   
        }
	}	
}