Array.prototype.mFilter = function(callbackFn) {
    const results = [];
    if(!callbackFn || typeof callbackFn !== 'function') {
        throw new Error('Callback function not found');
    }
    if(callbackFn.length <= 0){
        throw new Error('Callback function must have atleast one parameter');
    }
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        const check = callbackFn.call(this, element, index, this);
        
        if(check){
            results.push(element);
        }
    }
    return results;
}