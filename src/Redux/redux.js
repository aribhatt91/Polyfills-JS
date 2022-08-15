const createStore = (reducer, preloadedState={}, enhancer) => {
    if(typeof reducer !== 'function'){
        throw new Error('Reducer must be a function');
    }

    let state = preloadedState,
    isDispatching = false;
    const listeners = [];

    const getState = () => {
        if(isDispatching){
            throw new Error('Cannot call getState() while dispatching')
        }
        return state;
    },
    /* 
    Used to watch changes to the store.
    @param: listener
    Listeners are invoked when an action is dispatched
    */
    subscribe = (listener) => {
        
        if(isDispatching){
            throw new Error('Cannot call subscribe() while dispatching')
        }

        if(typeof listener !== 'function') {
            throw new Error('Store listner must be a function');
        }
        return function unsubscribe() {
            if(isDispatching){
                throw new Error('Cannot call unsubscribe() while dispatching')
            }
            const index = listeners.indexOf(listener);
            if(index > -1){
                listeners.splice(index, 1);
            }
        }
    },
    dispatch = (action) => {
        if(isDispatching){
            throw new Error('Cannot call dispatch() while dispatching');
        }

        if(typeof 'action' !== 'object'){
            throw Error('An action must be a plain object');
        }
        if(typeof action.type === 'undefined'){
            throw Error('Actions may not have an undefined "type" property');
        }
        isDispatching = true;

        try{
            state = reducer(state, action);
            listeners.forEach(listener => listener())
        }catch(error){

        }finally {
            isDispatching = false;
        }

        
    }

    /* DEFAULT ACTION */
    dispatch({
        type: 'INIT_ACTION'
    })

    return {
        getState,
        subscribe,
        dispatch
    }
}

const applyMiddlewares = () => {

}

module.exports = {
    createStore
}