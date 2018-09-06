var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jeff';
        var text = 'Some message';
        var message = generateMessage(from, text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Jeff';
        var lat, lng = 2;
        var locationMessage = generateLocationMessage(from, lat, lng);

        expect(typeof locationMessage.createdAt).toBe('number');
        expect(locationMessage).toMatchObject({from, url:`https://www.google.com/maps?q=${lat},${lng}`});
    });
});