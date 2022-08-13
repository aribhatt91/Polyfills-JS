Array.prototype.shuffle = function() {
    const arr = this,
    length = arr.length;

    for (let i = 0; i < length/2; i++) {
        const rand = Math.floor(Math.random() * length)%length;

        if(rand < length){
            let t = arr[i];
            arr[i] = arr[rand];
            arr[rand] = t;
        }
    }
}