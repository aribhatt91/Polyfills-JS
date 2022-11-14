const deepCompare = (o1, o2) => {
    /* tYPE CHECKING */
    if(typeof o1 !== typeof o2) {
        return false;
    }
    /* oNE IS NULL OTHER IS NOT */
    if((!o1 && o2) || (o1 && !o2)){
        return false;
    }
    else if(Array.isArray(o1) && o1.length !== o2.length) {
        return false;
    }
    /* NaN check */
    if(typeof o1 == 'number' && isNaN(o1) && isNaN(o2)) {
        return true;
    }

    /* truthy for non-objects */
    if(typeof o1 !== 'object') {
        return o1 === o2;
    }else {//Object
        const keys = Object.keys(o1);
        /* Check for equal number of properties */
        if(keys.length !== Object.keys(o2).length){
            return false;
        }
        /* Compare each property */
        for (let i = 0; i < keys.length; i++) {
            if(!o2.hasownProperty(key)){
                return false;
            }else if(deepCompare(o1[key] && o2[key])){
                continue;
            }else {
                return false;
            }
            
        }
        //deepCompare(o1, o2);
    }

    return true;
}