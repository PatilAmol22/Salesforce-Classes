public class FutureDemo {
    public  void invokeFutureCall(){
        String primitiveValue = 'Input to Future method';
        List<String>listofPrimitiveValue = new  List<String>{PrimitiveValue};
        
        FutureMethod1(listofPrimitiveValue);  
        
        FutureMethod2(); 
        FutureMethod3(); 
    }
    
    @future
    public static void FutureMethod1(List<String> inputParam){
        System.debug('Inside The future method1');
        System.debug('inputParam:'+inputParam);
        
    }
    @future 
    public static void FutureMethod2(){
        System.debug('Inside The future method2');
        
    }
    @future
    public static void FutureMethod3(){
        System.debug('Inside The future method3');
        
    } 
}