const assert = require('assert');
let utils = require('../utils.js');

describe('removeProtocol', () => {
    it('should remove http from url', () => {
        assert.equal(
            utils.removeProtocol('http://www.example.com'),
            'www.example.com');
    });

    it('should remove https from url', () => {
        assert.equal(
            utils.removeProtocol('https://www.example.com'),
            'www.example.com');
    });
});

describe('getWebsiteName', () => {

    it('should get name from url with www', () => {
        assert.equal(
            utils.getWebsiteName('http://www.example.com'),
            'example'
        );
    });

    it('should get name from url without www', () => {
        assert.equal(
            utils.getWebsiteName('http://example.com'),
            'example'
        );
    });

});