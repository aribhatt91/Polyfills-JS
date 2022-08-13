/* 
Note: functions passed to pipe will have one argument each
*/
const pipe = (fns) => {

    return (value) => {
        let result = value;
        for (let i = 0; i < fns.length; i++) {
            result = fns[i](result);
        }
        return result;
    }
}

const pipe2 = (fns) => (value) => fns.reduce((result, fn) => fn(result), value) 