/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var SocialShare = require('../src/index.js');


describe('测试文件', function () {
    it('main', function (done) {
        var ss = new SocialShare({
            maxDescLength: 11
        });
        var img = 'http://usr.im/600x600';
        var imgEl = document.createElement('img');

        imgEl.src = img;
        document.body.appendChild(imgEl);

        var ready = function () {
            expect(ss.weibo()).toMatch(/sina/);
            expect(ss.qqFriend()).toMatch(/connect\.qq\.com/);
            expect(ss.qqZone()).toMatch(/qzone\.qq\.com/);
            expect(ss.weixin()).toMatch(/topscan\.com/);
            expect(ss.tieba()).toMatch(/tieba\.baidu\.com/);

            document.body.removeChild(imgEl);
            done();
        };

        imgEl.onload = function () {
            ready();
        };

        if(imgEl.completed){
            ready();
        }
    });
});
