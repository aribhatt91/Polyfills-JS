const { resolve } = require("../Promises/MyPromise");

/* 
LazyMan is very lazy, he only eats and sleeps.

LazyMan(name: string, logFn: (log: string) => void) would output a message, the passed logFn is used.

He can eat(food: string)

He also sleep(time: number), time is based on seconds.

He can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.

*/


function LazyMan(name, fn) {
    const queue = [() => fn(`Hi! I am ${name}`)],
    priorityQueue = [];

    const wait = async (lapse) => new Promise(resolve => {
        setTimeout(resolve, lapse * 1000)
    }),
    sleepFn = (duration) => {
        return async () => {
            await wait(duration);
            fn(`Waking up after ${duration} second${duration > 1 ? 's' : ''}`);
        }
        
    }

    const lazyMan = {
        eat: (food) => {
            queue.push(() => fn(`Eat ${food}.`));
            return lazyMan;
        },
        sleep: (time) => {
            queue.push(sleepFn(time));
            return lazyMan;
        },
        sleepFirst: (time) => {
            priorityQueue.push(sleepFn(time));
            return lazyMan;
        }

    }

    setTimeout(async () => {
        for(let callback of [...priorityQueue, ...queue]) {
            await callback();
        }
    }, 0)

    return lazyMan;
}