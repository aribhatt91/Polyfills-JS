class ElementCollection extends Array {
    constructor(args){
        super(args);
        this.on = this.#onUnbound;
        this.css = this.#cssUnbound.bind(this);
        this.addClass = this.#addClassUnbound.bind(this);
        this.removeClass = this.#removeClassUnbound.bind(this);
        this.find = this.#findUnbound.bind(this);
        this.ready = this.#readyUnbound.bind(this);
    }

    #readyUnbound(callback){
        const isReady = this.some(e => {
            return e.readyState !== null && e.readyState !== 'loading';
        })
        if(isReady){
            callback();
        }else {
            this.on('DOMContentLoaded', callback);
        }
        return this;
    }

    #onUnbound(event, callbackOrSelector, callback) {
        if(typeof callbackOrSelector === 'function'){
            this.forEach( e => e.addEventListener(event, callbackOrSelector));
        }else {
            this.forEach( elem => {
                elem.addEventListener(event, e => {
                    if(e.target.matches(callbackOrSelector)) {
                        callback(e);
                    }
                })
            })
        }
        return this;
    }

    next(){
        return this.map(elem => elem.nextElementSibling).filter(elem => elem !== null);
    }

    prev(){
        return this.map(elem => elem.previousElementSibling).filter(elem => elem !== null);
    }

    get(index){
        return this[index];
    }

    #addClassUnbound(className){
        this.forEach(elem => {
            elem.classList.add(className);
        })
        return this;
    }

    #removeClassUnbound(className){
        this.forEach(elem => {
            elem.classList.remove(className);
        })
        return this;
    }

    #cssUnbound(key, value){
        this.forEach(elem => {
            elem.style[key] = value;
        })
        return this;
    }

    #findUnbound(selector) {
        if(typeof selector !== 'string'){
            return new ElementCollection([]);
        }
        return this.filter(elem => elem.matches(selector))
    }
}
function jQueryClone(param){
    if(typeof param === 'string' || param instanceof String) {
        return new ElementCollection(...document.querySelectorAll(param));
    }else if(param instanceof HTMLElement || param instanceof Element) {
        return new ElementCollection(param);
    }else {
        throw Error('jQueryClone function takes an argument of type string or elemnt')
    }
}

exports.module = jQueryClone;