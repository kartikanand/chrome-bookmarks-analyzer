const assert = require('assert');
const expect = require('chai').expect;
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

describe('get_top_k', () => {
    it('should return top k elements from given count map', () => {
        const hmap = new Map();

        hmap.set('c', 8);
        hmap.set('a', 10);
        hmap.set('b', 9);

        expect(utils.get_top_k(hmap, 2)).to.have.deep.members(['a', 'b']);
    });

    it('should return top k elements from given count map', () => {
        const hmap = new Map();
        hmap.set('a', 10);

        expect(utils.get_top_k(hmap, 2)).to.have.deep.members(['a']);
    });

    it('should return top k elements from given count map', () => {
        const hmap = new Map();
        
        hmap.set('c', 8);
        hmap.set('a', 10);
        hmap.set('d', 10);
        hmap.set('b', 9);

        expect(utils.get_top_k(hmap, 3)).to.have.deep.members(['a', 'd', 'b']);
    });
});
