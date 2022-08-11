const {sum} = require('./util');

test('properly run 2 numbers', () => {
    expect(sum(1, 2)).toBe(3);
    //expect(sum()).toBeUndefined()
})