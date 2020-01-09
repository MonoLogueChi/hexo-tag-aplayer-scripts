const BaseTag = require('./base'),
    Constant = require('../constant'),
    extractOptionValue = require('../util').extractOptionValue,
    throwError = require('../util').throwError,
    BILIBILI_TAG_OPTION = Constant.BILIBILI_TAG_OPTION;

class BiliBiliTag extends BaseTag {
    constructor(hexo, args) {
        super(hexo, args);
        this.bilibiliConfig = this.config.get('bilibili');
        this.settings = this.parse(args);
    }

    parse(options) {
        let settings = Object.assign({}, BILIBILI_TAG_OPTION, this.bilibiliConfig.default);
        options.forEach((option, index) => {
            switch (true) {
                case option.startsWith('av:'):
                    settings.aid = extractOptionValue(option).replace(/[^0-9]/ig, '');
                    break;
                case option.startsWith('aid:'):
                    settings.aid = extractOptionValue(option);
                    break;
                case option.startsWith('page:'):
                    settings.page = extractOptionValue(option);
                    break;
                case option.startsWith('quality:'):
                    settings.quality = extractOptionValue(option);
                    break;
                case option === 'danmaku':
                    settings.danmaku = true;
                    break;
                case option === 'allowfullscreen':
                    settings.allowfullscreen = 'allowfullscreen';
                    break;
                case option.startsWith('width:'):
                    settings.width = extractOptionValue(option);
                    break;
                case option.startsWith('height:'):
                    settings.height = extractOptionValue(option);
                    break;
                case option.startsWith('margin:'):
                    settings.margin = extractOptionValue(option);
                    break;
            }
        });
        return settings;
    }

    generate() {
        let { aid, page, quality, danmaku, allowfullscreen, width, height, margin } = this.settings;

        return `
        <style>.bbplayer{width: ${width}; height: ${height}; margin: ${margin}}</style>
        <div class="bbplayer">
        <iframe class="bbplayer" src="//player.bilibili.com/player.html?aid=${aid}&page=${page}&high_quality=${quality == 'high' ? 1 : 0}&danmaku=${danmaku}"
            allowfullscreen="${(allowfullscreen == 'allowfullscreen' || allowfullscreen == 'true') ? 'allowfullscreen' : 'no'}"
            scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>
        </div>
        `;
    }
}

module.exports = BiliBiliTag;
