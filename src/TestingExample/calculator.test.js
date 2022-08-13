const { add, subtract, multiply, divide, modulo} = require('./calculator');

test('properly run 2 numbers', () => {
    expect(add(1, 2)).toBe(3);
    //expect(sum()).toBeUndefined()
    expect(subtract(20, 30)).toBe(-10);
})

describe('test basic calculator functions', () => {
    it('subtract two numbers', () => {
        expect(subtract(1, 2)).toBe(-1);
    });

    it('add - pass no value', () => {
        expect(add()).toBeNaN()
    });

    it('add - pass one string value', () => {
        expect(add(1, 'anc')).toBeNaN()
    });
    
    
});
