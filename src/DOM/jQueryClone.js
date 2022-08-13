class ElementCollection extends Array {

    on = this.#onUnbound;
    css = this.#cssUnbound.bind(this);
    addClass = this.#addClassUnbound.bind(this);
    removeClass = this.#removeClassUnbound.bind(this);
    find = this.#findUnbound.bind(this);
    ready = this.#readyUnbound.bind(this);
    prev = this.#prevUnbound.bind(this);
    next = this.#nextUnbound.bind(this);
    get = this.#getUnbound.bind(this);

    #readyUnbound(callback){
        if(typeof callback === 'function'){
            const isReady = this.some(e => {
                return e.readyState !== null && e.readyState !== 'loading';
            })
            if(isReady){
                callback();
            }else {
                this.on('DOMContentLoaded', callback);
            }
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

    #nextUnbound(){
        return this.map(elem => elem.nextElementSibling).filter(elem => elem !== null);
    }

    #prevUnbound(){
        return this.map(elem => elem.previousElementSibling).filter(elem => elem !== null);
    }

    #getUnbound(index=0){
        return this[index];
    }

    #addClassUnbound(className){
        if(className){
            this.forEach(elem => {
                elem.classList.add(className);
            })
        }
        return this;
    }

    #removeClassUnbound(className){
        this.forEach(elem => {
            elem.classList.remove(className);
        })
        return this;
    }

    #cssUnbound(key, value){
        if(key){
            const camelProp = key.replace(/(-[a-z])/, g => {
                return g.replace('-', '').toUpperCase();
            })
            this.forEach(elem => {
                elem.style[camelProp] = value;
            })
        }
        
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
        return new ElementCollection(...(document.querySelectorAll(param)));
    }else if(param instanceof HTMLElement || param instanceof Element) {
        return new ElementCollection(param);
    }else {
        throw Error('jQueryClone function takes an argument of type string or elemnt')
    }
}

jQueryClone.get = ({url, data={}, success, dataType, error}) => {}

exports.module = jQueryClone;