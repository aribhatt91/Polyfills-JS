const original_Node_addEventListener = Node.prototype.addEventListener;
const original_Node_removeEventListener = Node.prototype.removeEventListener;
const original_Node_cloneNode = Node.prototype.cloneNode;
const EventMap = new Map();

/* Override addEventListner to update the EventMap everytime a listner is added to a node */
Node.prototype.addEventListener = function (event, listener, useCapture) {
    const node = this;
    
    if (typeof arguments[1] == "function") {
        if(!EventMap.has(node)) {
            EventMap.set(node, new Map());
        }
        const listenerMap = EventMap.get(node);
        const listenerArray = listenerMap.get(event) || [];
        listenerMap.set(event, listenerArray.push(listener))
    }
    original_Node_addEventListener.apply(this, [].slice.call(arguments))
}

/* Override addEventListner to update the EventMap everytime a listner is removed from a node */
Node.prototype.removeEventListener = function (event, listener, useCapture) {
    const node = this;
    
    if (typeof arguments[1] == "function") {
        if(EventMap.has(node)) {
            const listenerMap = EventMap.get(node);
            let listenerArray = listenerMap.get(event) || [];
            listenerArray = listenerArray.filter(l => l !== listener);
            listenerMap.set(event, listenerArray);
        }   
    }
    original_Node_removeEventListener.apply(this, [].slice.call(arguments))
}

/* Override cloneNode to attach event listeners from the EventMap */
Node.prototype.cloneNode = function() {
    const originalNode = this;
    const newNode = original_Node_cloneNode.apply(this, [].slice.call(arguments));
    
    const deep = arguments[0] === true;
    attachEventListenersToChildren(newNode, originalNode, deep);

    return newNode;
}

/* Recursively attach event listener to the node and its children */
const attachEventListenersToChildren = (newNode, originalNode, deep) => {
    if(!newNode || !originalNode){return}

    if(newNode.children && deep) {
        const newNodeChildren = Array.from(newNode.children), 
        originalNodeChildren = Array.from(originalNode.children);
        newNodeChildren.forEach((c, i) => attachEventListenersToChildren(c, originalNodeChildren[i], true));
    }
    

    if(EventMap.has(originalNode)){
        const eventMap = EventMap(originalNode);
        eventMap.forEach((event, listenerArray) => {
            listenerArray.forEach(listener => {
                newNode.addEventListener(event, listener);
            })
        });
    }
}
