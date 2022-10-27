/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
map calls a provided callbackFn function once for each element in an array, in order, and constructs a new array from the results.

The map() method is a copying method. It does not alter this.

callbackFn is invoked only for array indexes which have assigned values. It is not invoked for empty slots in sparse arrays.
callbackFn is invoked with three arguments: the value of the element, the index of the element, and the array object being mapped.

If a thisArg parameter is provided, it will be used as callback's this value. Otherwise, the value undefined will be used as its this value. 

 */

Array.prototype.mMap = function(callbackFn, thisArg) {
    const results = [];
    if(!callbackFn || typeof callbackFn !== 'function') {
        throw new Error('Callback function not found');
    }
    if(callbackFn.length <= 0){
        throw new Error('Callback function must have atleast one parameter');
    }
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        results.push(callbackFn.call(thisArg || this, element, index, this));
    }
    return results;
}