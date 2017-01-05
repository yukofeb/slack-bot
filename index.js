var RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;

var request = require('request');

var token = process.env.SLACK_API_TOKEN || '';
var g_access_key = process.env.G_ACCESS_KEY;

var rtm = new RtmClient(token, { logLevel: 'info' });
rtm.start();

rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
    console.log('Message:', message);
    console.log('user: '+ message.user);
});

rtm.on(RTM_EVENTS.REACTION_ADDED, function handleRtmReactionAdded(reaction) {
    console.log('Reaction added:', reaction);
});

rtm.on(RTM_EVENTS.REACTION_REMOVED, function handleRtmReactionRemoved(reaction) {
    console.log('Reaction removed:', reaction);
});

rtm.on(RTM_EVENTS.MESSAGE, function replyYourMessage(message) {
    //rtm.sendMessage("<@" + message.user + "> " + message.text, message.channel);
});

rtm.on(RTM_EVENTS.MESSAGE, function replyMessage(message) {
    if (message.user !== undefined) {
        // Help
        if (message.text.match(/^\$help\slunch/)) {
            var str = 'Usage: $lunch [options]\n\n' +
                'Options:\n No options.';
            rtm.sendMessage(str, message.channel);
        } else if (message.text.match(/^\$help\ssearch/))  {
            var str = 'Usage: $search [options]\n\n' +
                'Options:\n query: search word';
            rtm.sendMessage(str, message.channel);
        } else if (message.text.match(/^\$help/)) {
            var str = 'Specify help command.\n\n' +
                    '$help lunch\n' +
                    '$help search';
            rtm.sendMessage(str, message.channel);
        }

        // Lunch
        if (message.text.match(/^\$lunch/)) {
            var G_AREACODES = 'AREAS2188'; //本郷
            var G_HIT_PER_PAGE = '30'
            var g_url = 'http://api.gnavi.co.jp/RestSearchAPI/20150630/?keyid=' + g_access_key + '&format=json&areacode_s=' + G_AREACODES + '&lunch=1&hit_per_page=' + G_HIT_PER_PAGE;
            var options = {
                url: g_url,
                json: true
            };
            request(options, function (error, response, body) {
                if (!error && response.statusCode == '200') {
                    console.log('total_hit_count: ' + body.total_hit_count);
                    var num = Math.floor(Math.random() * body.total_hit_count);
                    var shop = body.rest[num];
                    var str = 'ランチ？ ' + shop.category + 'はどう？\n' + shop.name + '\n' + shop.address + '\n' + shop.url;
                    rtm.sendMessage(str, message.channel);
                } else {
                    rtm.sendMessage('No hit.', message.channel);
                }
            })
        }

        // search
        if (message.text.match(/^\$search$/)) {
            rtm.sendMessage('No query. Example: $search apple', message.channel);
        } else if (message.text.match(/^\$search/)) {
            var search_word = message.text.match(/^\$search\s(.*)/);
            var amazon_url = 'https://www.amazon.co.jp/s/field-keywords=' + encodeURIComponent(search_word[1]);
            var reply_str = 'Amazon: ' + amazon_url;
            rtm.sendMessage(reply_str, message.channel);
        }

        // ohayo
        if (message.text.match(/おはよー|おはよう/)) {
            var ohayo = ['おはよー', 'おはよう！', 'おはようございます。', 'Good Morning!'];
            var num = Math.floor(Math.random() * ohayo.length);
            rtm.sendMessage(ohayo[num], message.channel);
        }

    }
});
