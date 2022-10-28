/* 
Create a function that takes an initial value and then chains operations
calc(x).add(5).sub(3).mul(6).div(4).val()
*/

function calc(initialValue){
    let res = initialValue;
    const that = this;
    
    this.add = (value) => {
        res += value;
        return that;
    },
    this.sub = (value) => {
        res -= value;
        return that;
    },
    this.mul = (value) => {
        res *= value;
        return that;
    },
    this.div = (value) => {
        res = res/value;
        return that;
    },
    this.val = () => {
        return res;
    }

    return that;
}