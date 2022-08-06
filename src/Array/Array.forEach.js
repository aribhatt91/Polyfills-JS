Array.prototype.mforEach = function (fn, ...args) {
  if (!fn || typeof fn !== "function") {
    throw new Error("First argument needs to be a function");
  }
  if (fn.length === 0) {
    throw new Error("Callback function must accept 1 or more arguments");
  }
  for (let i = 0; i < this.length; i++) {
    fn.call(this, this[i], i, this);
  }
};
