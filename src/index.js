'use strict'
import MyPromise from './Promises/MyPromise';

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  <button id="calculateSum">Calculate Sum</button>
  <button id="changeBackground">Change background</button>
</div>
`;
const worker = new Worker('../worker.js');
window.colour__green = true;
document.body.style.backgroundColor = 'green';
document.getElementById('changeBackground').addEventListener('click', function(e){
  const colour = window.colour__green !== true ? 'green' : 'blue';
  window.colour__green = !window.colour__green;
  document.body.style.backgroundColor = colour;
})

document.getElementById('calculateSum').addEventListener('click', function(e){
  /* let sum = 0;
  for (let i = 0; i < 10000000000; i++) {
    sum += i;
  }
  alert(sum); */
  worker.postMessage('Hello!!')
})

/* Understanding let, const, var */

{
  var a = 'Hello from Block';
  console.log(a);
}
{
  const a = 'Hi from another Block!';
  console.log(a);
}


/* Promise */

new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(10)
  }, 10000)
  //resolve(10);
}).then(data => {
  console.log(data);
  return data*2
}).then(data => {
  console.log(data);
});

const asyncTest = async () => {
  const p = await (new MyPromise((res) => {
    res(200);
  }));

  console.log(p);
}

asyncTest();

/* const obj = {
  a: 2,
  fn: () => {
    console.log('value of a', this.a)
  }
}

console.log('logging this from outside ', this);
function fn(){
  console.log('logging this from fn ', this);
}

obj.fn(); */

const generateHash = (args = []) => {
  return args.join('||');
}
const memoize = () => {
  const cache = {};

  return (fn, args) => {
    const key = generateHash(args.concat(fn.name));
    if(key && !cache.hasOwnProperty(key)) {
      cache[key] = fn.apply(null, args);
    }
    return cache[key];
  }
}

const multiply = (a, b) => a*b,
add = (a, b) => a+b;

const Memoize = memoize();
const result1 = Memoize(multiply, [2,3]),
result2 = Memoize(add, [2,3]),
result3 = Memoize(multiply, [2,3]),
result4 = Memoize(add, [2,3]);

console.log(result1, result2);
console.log(result3, result4);