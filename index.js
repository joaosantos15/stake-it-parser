let parser = require('./src/stakeItParser.js')
let selectors = require('./src/selectors.js')
exports = module.exports
// console.log(result[2])
//

exports.parseTweet = parser.parseTweet
exports.TweetBet = parser.TweetBet
exports.generateTweetIdFromContent = parser.generateTweetIdFromContent

exports.getTweetsFromDocument = selectors.getTweetsFromDocument
exports.getTweetText = selectors.getTweetText
