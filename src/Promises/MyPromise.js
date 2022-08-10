const STATE_MAP = {
    PENDING: 0,
    RESOLVED: 1,
    REJECTED: 2
};
class MyPromise {
    
    
    #state;
    #value;
    #onSuccessChain = [];
    #onFailureChain = [];
    #onSuccessBind = this.#onSuccess.bind(this);
    #onFailureBind = this.#onFailure.bind(this);

    /* 
    Constructor receives an executor function 
    */
    constructor(executor){
        try{
            /* Set state to pending */
            this.#state = STATE_MAP.PENDING;
            if(!executor || typeof executor !== 'function'){
                throw new Error('Expecting a function as an argument, received ', typeof executor);
            }
            executor(this.#onSuccessBind, this.#onFailureBind);
        }catch(error) {
            this.#onFailure(error);
        }

        
    }
    #runCallbacks(){
        /* Async operations */
        if(this.#onSuccessChain.length && this.#state === STATE_MAP.RESOLVED){
            this.#onSuccessChain.forEach( callback => {
                callback(this.#value)
            })

            this.#onSuccessChain = [];
        }
        else if(this.#onFailureChain.length && this.#state === STATE_MAP.REJECTED){
            this.#onFailureChain.forEach( callback => {
                callback(this.#value)
            })

            this.#onFailureChain = [];
        }
    }
    #onSuccess(value){
        queueMicrotask(() => {
            if(this.#state !== STATE_MAP.PENDING){
                return;
            }

            /* In case where a promise is returned from another promise */
            if(value instanceof MyPromise){
                value.then(this.#onSuccessBind, this.#onFailureBind);
                return;
            }

            this.#value = value;
            this.#state = STATE_MAP.RESOLVED;
            this.#runCallbacks();
        })
    }
    #onFailure(value){
        queueMicrotask(() => {
            if(this.#state !== STATE_MAP.PENDING){
                return;
            }

            /* In case where a promise is returned from another promise */
            if(value instanceof MyPromise){
                value.then(this.#onSuccessBind, this.#onFailureBind);
                return
            }

            // If no catch method is chained and a rejection occurs
            if(!this.#onFailureChain.length) {
                throw new UncaughtPromiseError(value);
            }
    
            
            this.#state = STATE_MAP.REJECTED;
            this.#value = value;
            this.#runCallbacks();
        })
    }
    then(thenFn, catchFn) {
        return new MyPromise((resolve, reject) => {

            this.#onSuccessChain.push(result => {
                /* If no futher then is chained to the current one */
                if(thenFn === null) {
                    resolve(result);
                    return;
                }
                /* If a then is chained to the current one */
                try {
                    resolve(thenFn(result));
                }catch(error) {
                    reject(error);
                }
            });

            this.#onFailureChain.push(result => {
                /* If no futher then is chained to the current one */
                if(catchFn === null) {
                    reject(result);
                    return;
                }
                /* If a then is chained to the current one */
                try {
                    resolve(catchFn(result));
                }catch(error) {
                    reject(error);
                }
            });


    
            this.#runCallbacks();
        });
    }

    catch(catchFn) {
        return this.then(undefined, catchFn)
    }

    finally(fn){
        return this.then( 
            (result) => {
                fn();
                return result;
            },
            (result) => {
                fn();
                return result;
            }
        )
    }

    /*  */

    static resolve(value) {
        return new MyPromise(resolve => {
            resolve(value)
        })
    }

    static reject(value) {
        return new MyPromise((resolve, reject) => {
            reject(value)
        })
    }
    /* 
    Takes in an array of promises. If all succeed, we return success. If any fail, we return failure 
    */
    static all(promises){
        const results = [];
        let completedPromises = 0;

        return new MyPromise((resolve, reject) => {
            for(let i =0; i< promises.length; i++){
                const promise = promises[i];

                promise.then(value => {
                    completedPromises++;
                    results[i] = value;
                    if(completedPromises === promises.length){
                        resolve(results);
                    }
                }).catch(reject);
            }
        })
    }

    /* 
    allSettled never uses reject
    */
    static allSettled(promises) {
        const results = [];
        let completedPromises = 0;

        return new MyPromise((resolve, reject) => {
            for(let i =0; i< promises.length; i++){
                const promise = promises[i];

                promise.then(value => {
                    results[i] = {state: STATE_MAP.RESOLVED, value};
                }).catch(reason => {
                    results[i] = {state: STATE_MAP.REJECTED, reason};
                }).finally(() => {
                    completedPromises++;
                    if(completedPromises === promises.length){
                        resolve(results);
                    }
                });
            }
        })
    }

    any(){
        const errors = [];
        let rejectedPromises = 0;

        return new MyPromise((resolve, reject) => {
            for(let i =0; i< promises.length; i++){
                const promise = promises[i];

                promise.then(resolve).catch(error => {
                    rejectedPromises++;
                    errors[i] = error;
                    if(rejectedPromises === promises.length){
                        reject(errors);
                    }
                });
            }
        })
    }

    race(){

        return new MyPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve).catch(reject);
            });
        })
    }
}

/* TODO - what is this.stack? */
class UncaughtPromiseError extends Error {
    constructor(value) {
        super(error);
        this.stack = `(in stack) ${error.stack}`
    }
}

export default MyPromise;