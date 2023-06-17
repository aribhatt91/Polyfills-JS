/* 
https://bigfrontend.dev/problem/implement-lodash-chunk

_.chunk() splits array into groups with the specific size.

Please implement your chunk(arr: any[], size: number)

*/
1,2,3,4,5 - 2
function chunk(arr, chunksize) {
    const res = [];
    if(!arr || !Array.isArray(arr)){
        console.error('Invalid argument, expecting an array');
    }
    if(!chunksize || typeof chunksize !== 'number') {
        console.error('Invalid argument, expecting chunk size to be a valid positive integer');
    }
    if(chunksize <= 0 || !arr.length) {
        return res;
    }
    if(chunksize >= arr.length) {
        res.push(arr);
        return res;
    }
    let temp = [];
    const residue = arr.length % chunksize;
    let i = 0;
    for (i = 0; i < arr.length; i++) {
        if(i < arr.length - residue){
            if(temp.length < chunksize) {
                temp.push(arr[i]);
            }else {
                res.push(temp.map(t => t));
                temp = [];
                temp.push(arr[i]);
            }
        }else {
            if(i === arr.length - residue) {
                res.push(temp.map(t => t));
                temp = [];
            }
            temp.push(arr[i]);
        }
        
    }
    if(temp.length){
        res.push(temp.map(t => t));
    }
    
    return res;
}