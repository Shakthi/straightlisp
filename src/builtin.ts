import evaluate from '../src/evaluate'
function assocOperater(fun:any){
  return function(){
    let result = [].slice.call(arguments).map((element:any)=>evaluate(element,this)).reduce(fun);            
    return result;            
  }
}





let builtinContext: any = {
    '+':assocOperater((a:any,b:any)=>a+b),
    '*':assocOperater((a:any,b:any)=>a*b),
    '-':assocOperater((a:any,b:any)=>a-b),
    '/':assocOperater((a:any,b:any)=>a/b),
    '>':assocOperater((a:any,b:any)=>a>b),
    '<':assocOperater((a:any,b:any)=>a<b),
    '==':assocOperater((a:any,b:any)=>a==b)
}


export default builtinContext;