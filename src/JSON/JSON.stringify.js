const mStringify = (obj) => {
    if(typeof obj === 'object' && obj !== null && typeof obj.toJSON === 'function') {
        obj = obj.toJSON();
    }
    if(typeof obj === 'undefined' || typeof obj === 'function' || typeof obj === 'symbol'){
        return
    }
    else if(obj === null || typeof obj === "number" || typeof obj === 'string' || typeof obj === 'boolean'){
        return typeof obj === 'string' ? `"${obj.replace(/"/g, '\\"')}"` : `${obj}`;
    }

    const isArray = Array.isArray(obj);
    let str = isArray ? '[' : '{';

    /* If obj is an Array or primitive object, deconstruct it */
    if(isArray || (typeof obj === 'object' && obj.__proto__.__proto__ === null)) {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
            const element = obj[keys[i]];
            if(typeof element === 'undefined' || typeof element === 'function'){
                continue;
            }
            const val = `${mStringify(element)}${i < keys.length - 1 ? ',' : ''}`;

            if(isArray){
                str += `${val}`;
            }else {
                str += `"${keys[i]}":${val}`
            }
        }
    }
    str += Array.isArray(obj) ? ']' : '}';
    return str;
}