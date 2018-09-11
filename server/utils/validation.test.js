const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var val = 24;
        expect(isRealString(val)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var val = '   ';
        expect(isRealString(val)).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var val = '   correct  ';
        expect(isRealString(val)).toBe(true);
    });
});
