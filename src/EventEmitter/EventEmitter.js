class EventEmitter {

    constructor(){
        this.subscriptions = {};
        this.count = -1;
    }

    subscribe(eventName, callback) {
        
        this.count++;
        const emitter = this, uuid = this.count;
        const events = this.subscriptions[eventName] || [];
        events.push({
            uuid, callback
        });

        this.subscriptions[eventName] = events;
        
        return {
            release: () => {
                (function(uuid, eventName, emitter){
                    const events = emitter.subscriptions[eventName] || [];
                    emitter.subscriptions[eventName] = events.filter(s => s.uuid !== uuid);
                })(uuid, eventName, emitter)
            }
        }
    }

    emit(eventName, ...args){
        const events = this.subscriptions[eventName] || [];  
        for (let i = 0; i < events.length; i++) {
            if(events[i].callback) {
                events[i].callback(...args);
            }
        }
    }
}



/* Test */
const emitter = new EventEmitter();
const callback1 = function(...args){
  console.log('Called callback1', ...args);
}, callback2 = function(...args){
  console.log('Called callback2', ...args);
}
const sub1  = emitter.subscribe('event1', callback1)
const sub2 = emitter.subscribe('event2', callback2)
const sub3 = emitter.subscribe('event1', callback1)

console.log(sub1, sub2, sub3);
emitter.emit('event1', 1, 2);