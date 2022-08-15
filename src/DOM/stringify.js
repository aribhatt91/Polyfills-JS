function stringify(obj){
    let start, end, contentString = '';

    let value = obj;
    if(typeof value === 'bigint'){
        throw new TypeError("BigInt value can't be serialized in JSON");
    }else if(value === Infinity || value === -Infinity || value !== value || value === undefined || value instanceof Symbol){
        return 'null';
    }else if(value instanceof Date){
        return `"${value.toISOString()}"`;
    }else if(typeof value === 'string'){
        return '"' + value + '"';
    }else if(typeof value === 'number' || typeof value === 'boolean'){
        return `${e}`;
    }else if(!value || typeof value === 'function') {
        return undefined;
    }else if(Array.isArray(value)){
        value = value.forEach(e => stringify(e)).join(',')
        return `[${value}]`
        
    }else if(typeof value === 'object') {
        const keys = Object.keys(value);
        keys.forEach(k => {
            contentString += ((contentString === '' ? '' : ',') + ('"' + k + '"' + ':' + stringify(value[k])));
        })
        return `{${contentString}}`;

    }
    return start + contentString + end;
}

function stringify(obj){
    let start, end, contentString = '';

    if(typeof obj === 'bigint'){
        throw new TypeError("BigInt value can't be serialized in JSON");
    }
    if(obj === Infinity || obj === NaN || obj === undefined){
        return null + '';
    }
    if(obj === null || obj === '' || obj === 0 || obj === false){
        return '' + obj;
    }else if(!obj || typeof obj === 'function') {
        return undefined;
    }
    if(typeof obj === 'string'){
        return '"' + obj + '"';
    }
    if(typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean'){
        return obj + '';
    }

    if(Array.isArray(obj)){
        start = '[';
        end = ']';
        obj.forEach(e => {
            if(typeof e === 'string' || typeof e === 'number' || typeof e === 'boolean'){
                contentString += ((contentString === '' ? '' : ',') + e)
            }else {
                contentString += ((contentString === '' ? '' : ',') + stringify(e))
            }
        })
        
    }else if(typeof obj === 'object') {
        start = '{';
        end = '}';

        const keys = Object.keys(obj);

        keys.forEach(k => {
            let value = obj[k];
            if(Array.isArray(value) || typeof value === 'object'){
                value = stringify(value);
            }else {
                value = '"' + value + '"'
            }
            contentString += ((contentString === '' ? '' : ',') + ('"' + k + '"' + ':' + value));
        })

    }
    return start + contentString + end;
}