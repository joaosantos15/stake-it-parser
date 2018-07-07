let TweetParser = require('tweet-parser')
let Web3Utils = require('web3-utils')
exports = module.exports
// console.log(result[2])

function cleanTweetContent (tweetContent) {
  if (tweetContent) {
    let cleanContent = tweetContent.replace(/(\r\n\t|\n|\r\t)/gm, '')
    cleanContent = cleanContent.replace(/\s/g, '')
    cleanContent = cleanContent.toLowerCase()
    return cleanContent
  } else { throw new Error() }
}

function generateTweetIdFromContent (tweetContent) {
  try {
    let cleanTweet = cleanTweetContent(tweetContent)
    let tweetId = Web3Utils.sha3(cleanTweet)
    return tweetId
  } catch (e) {
    console.error(e)
    return false
  }
}

function checkIfIsStakeItTweet (parsedTweet) {
  let size = parsedTweet.length

  for (let i = 0; i < size; i++) {
    let currItem = parsedTweet[i]
    if (currItem.type === 'HASH' && currItem.content === '#stakeit') {
      // console.log('Is Stake.it tweet')
      return i
    }
  }
  return false
}

function getBetAgainst (stakeItMarker, parsedTweet) {
  if (parsedTweet[stakeItMarker + 2].type === 'USER') {
    return parsedTweet[stakeItMarker + 2].content.substr(1)
  }

  return false
}

function getJudge (stakeItMarker, parsedTweet) {
  if (parsedTweet[stakeItMarker + 4].type === 'USER') {
    return parsedTweet[stakeItMarker + 4].content.substr(1)
  }

  return false
}

function TweetBet (_issuer, _against, _judge) {
  this.against = _against
  this.judge = _judge
  this.issuer = _issuer
}

function parseTweet (issuer, tweet) {
  const result = TweetParser.parse(tweet)
  const marker = checkIfIsStakeItTweet(result)
  const against = getBetAgainst(marker, result)
  const judge = getJudge(marker, result)

  return new TweetBet(issuer, against, judge)
}

exports.parseTweet = parseTweet
exports.TweetBet = TweetBet
exports.generateTweetIdFromContent = generateTweetIdFromContent

/*                 *
*    USAGE EXAMPLE *
*/

// get tweet
// document.getElementsByClassName("original-tweet")[1].getElementsByClassName("js-tweet-text-container")[0].innerText

// get user
// JSON.parse(document.getElementsByClassName("original-tweet")[1].getAttribute("data-reply-to-users-json"))[0].screen_name
