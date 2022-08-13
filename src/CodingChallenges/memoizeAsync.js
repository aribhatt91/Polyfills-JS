const generateHash = (args=[]) => {
    return args.join('|');
}

const memoizeAsync = () => {
    let cache = isInProgress = {};

    return (config, callback) => {
        const {url, duration, method='GET'} = config;
        const key = generateHash([key, url]);
        /* Check in cache */
        if(key && cache.hasOwnProperty('key')) {
            return cache[key];
        }

        /* Check if fetch call is in progress for the same endpoint and method */
        if(!isInProgress.hasOwnProperty('key')){
            isInProgress['key'] = [callback];
        }else {
            isInProgress['key'].push(callback);
            return;
        }

        /* Make the fetch call */

        fetch(url).then(res => res.json().data)
        .then(data => {
            cache[key] = data;
            for (let i = 0; i < isInProgress[key].length; i++) {
                const cb = isInProgress[key][i];
                cb(data);
            }
            /* Delete the stale data from cache if a timeout duration is provided */
            if(duration){
                setTimeout(() => {
                    delete cache[key];
                    delete isInProgress[key];
                }, duration);
            }
            delete isInProgress[key];
        })
    }
}


/* 

Requirements

- Take a callback and a config as a parameter
- Config contains duration for cache, URL to make the fetch call
- Cache the fetch call response for the duration so that no further call is made
- While a call is in progress, don't make another fetch call to the same end point (maintain a queue of fetch calls)
- Clear the cache and the queue once the duration timeouts. 

*/