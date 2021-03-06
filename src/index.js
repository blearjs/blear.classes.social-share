/**
 * 社会化分享，仅支持微博、QQ好友、QQ空间、微信
 * @author ydr.me
 * @create 2016-05-09 12:14
 */



'use strict';

var Events =    require('blear.classes.events');
var selector =  require('blear.core.selector');
var attribute = require('blear.core.attribute');
var object =    require('blear.utils.object');
var qs =        require('blear.utils.querystring');
var url =       require('blear.utils.url');

var win = window;
var doc = win.document;
var location = win.location;
var WEIBO_URL = 'http://v.t.sina.com.cn/share/share.php?';
var QQ_FRIEND_URL = 'http://connect.qq.com/widget/shareqq/index.html?';
var QQ_ZONE_URL = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';
var TIEBA_URL = 'http://tieba.baidu.com/f/commit/share/openShareApi?';
var defaults = {
    title: '',
    desc: '',
    img: '',
    link: '',
    minImgSize: 200,
    maxDescLength: 0
};

var SocialShare = Events.extend({
    className: 'SocialShare',
    constructor: function (options) {
        var the = this;

        SocialShare.parent(the);
        the[_options] = object.assign(true, {}, defaults, options);
    },


    /**
     * 分享到微博
     * @returns {String}
     */
    weibo: function () {
        var options = this[_guessOptions]();

        return WEIBO_URL + qs.stringify({
                url: options.link,
                title: options.title,
                content: options.desc,
                pic: options.img
            });
    },


    /**
     * 分享到 QQ 好友
     * @returns {String}
     */
    qqFriend: function () {
        var options = this[_guessOptions]();

        return QQ_FRIEND_URL + qs.stringify({
                url: options.link,
                desc: options.desc,
                pics: options.img
            });
    },


    /**
     * 分享到 QQ 空间
     * @returns {String}
     */
    qqZone: function () {
        var options = this[_guessOptions]();

        return QQ_ZONE_URL + qs.stringify({
                url: options.link,
                title: options.title,
                summary: options.desc,
                pics: options.img
            });
    },


    /**
     * 分享到微信
     * @returns {string}
     */
    weixin: function () {
        var options = this[_guessOptions]();

        return url.qrcode(options.link);
    },


    /**
     * 分享到百度贴吧
     * @returns {string}
     */
    tieba: function () {
        var options = this[_guessOptions]();

        return TIEBA_URL + qs.stringify({
                url: options.link,
                desc: options.desc,
                title: options.title,
                pic: options.img
            });
    }
});
var _options = SocialShare.sole();
var _guessOptions = SocialShare.sole();
var pro = SocialShare.prototype;


/**
 * 猜想 options
 */
pro[_guessOptions] = function () {
    var the = this;
    var options = the[_options];
    var metaEls = selector.query('meta');
    var descMetaEls = selector.filter(metaEls, function (el) {
        return el.name === 'description';
    });
    var descMetaEl = descMetaEls[0];
    var imgEls = selector.query('img');
    imgEls = selector.filter(imgEls, function (el) {
        return el.width > options.minImgSize && el.height > options.minImgSize;
    });
    var imgEl = imgEls[0];

    options.title = options.title || doc.title;
    options.desc = options.desc || (descMetaEl ? attribute.attr(descMetaEl, 'content') : options.title);
    options.img = options.img || (imgEl ? imgEl.src : '');
    options.link = options.link || location.href;

    if (options.maxDescLength > 0) {
        options.desc = options.desc.slice(0, options.maxDescLength);
    }
    
    return options;
};

SocialShare.defaults = defaults;
module.exports = SocialShare;
