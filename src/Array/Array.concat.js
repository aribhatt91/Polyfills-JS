/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat 
*/
Array.prototype.mConcat = function(...args) {
    const result = [];
    for (let index = 0; index < this.length; index++) {
        result.push(this[index]);
        
    }
    for (let i = 0; i < args.length; i++) {
        if(Array.isArray(args[i])){
            for (let j = 0; j < args[i].length; j++) {
                result.push(args[i][j]); 
            }
        }else {
            result.push(args[i]);
        }
    }
}