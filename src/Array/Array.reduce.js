/* 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
The reduce() method executes a user-supplied "reducer" callback function on each element of the array, in order, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the array is a single value.
callbackFn
A "reducer" function called with the following arguments:

previousValue
The value resulting from the previous call to callbackFn. On first call, initialValue if specified, otherwise the value of array[0].

currentValue
The value of the current element. On first call, the value of array[0] if an initialValue was specified, otherwise the value of array[1].

currentIndex
The index position of currentValue in the array. On first call, 0 if initialValue was specified, otherwise 1.

array
The array being traversed.

initialValue Optional
A value to which previousValue is initialized the first time the callback is called. If initialValue is specified, that also causes currentValue to be initialized to the first value in the array. If initialValue is not specified, previousValue is initialized to the first value in the array, and currentValue is initialized to the second value in the array.
*/

Array.prototype.mReduce = function(callbackFn, initialValue) {
    
    if(!callbackFn || typeof callbackFn !== 'function') {
        throw new Error('Callback function not found');
    }
    if(callbackFn.length < 1){
        throw new Error('Callback function must have atleast one parameter');
    }
    if(this.length === 0) {
        if(typeof initialValue === 'undefined'){
            throw new TypeError('The array contains no elements and initialValue is not provided.');
        }else {
            return initialValue;
        }
    }
    if(this.length === 1 && typeof initialValue === 'undefined') {
        return this[0];
    }
    let previousValue = typeof initialValue === 'undefined' ? this[0] : initialValue, /* Accumulator */
    currentValue;

    for (let index = 0; index < this.length; index++) {
        if(index === 0 && typeof initialValue === 'undefined'){
            continue;
        }
        currentValue = this[index];
        previousValue = callbackFn.call(this, previousValue, currentValue, index, this);
    }
    return previousValue;
}