Array.prototype.mflat = function () {
  if (!this) {
    throw new Error("Can't work on null or undefined");
  }
  var res = [];
  var len = this.length;
  for (var i = 0; i < len; i++) {
    if (Array.isArray(this[i])) {
      res = res.concat(this[i].mflat());
    } else {
      res.push(this[i]);
    }
  }
  return res;
};

/*
[1,2,3,[4,[5,[6],7],8],9,10]
[1, 2, 3,4,5,6,7, 8, 9, 10]
*/
