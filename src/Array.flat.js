Array.prototype.mflat = function () {
  if (!this || !Array.isArray(this)) {
    throw new Error("Invalid input");
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
