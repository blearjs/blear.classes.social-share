/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var querystring = require('../src/index.js');

var str = 'a=1&b=2&c=3&b=4';
var buildURL = function (querystring) {
    history.pushState(null, '', '?' + querystring);
};


describe('测试文件', function () {
    beforeAll(function () {
        buildURL(str);
    });

    afterAll(function () {
        buildURL('');
    });

    it('.toString', function () {
        expect(querystring.toString()).toEqual(str);
    });

    it('.parse', function () {
        expect(querystring.parse()).toEqual({
            a: '1',
            b: ['2', '4'],
            c: '3'
        });
    });

    it('.get', function () {
        expect(querystring.get()).toEqual({
            a: '1',
            b: ['2', '4'],
            c: '3'
        });
        expect(querystring.get('a')).toEqual('1');
        expect(querystring.get('b')).toEqual(['2', '4']);
        expect(querystring.get('c')).toEqual('3');
        expect(querystring.get('d')).toEqual(undefined);
    });

    it('.set', function () {
        buildURL(querystring.set('a', 5));
        expect(querystring.get('a')).toEqual('5');
    });

    it('.remove', function () {
        buildURL(querystring.remove('a'));
        expect(querystring.get('a')).toEqual(undefined);
        buildURL(querystring.remove('b'));
        expect(querystring.get('b')).toEqual(undefined);
    });
});
