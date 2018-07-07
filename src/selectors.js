exports = module.exports

function cleanTweet (tweetContent) {
  return tweetContent.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '')
}

function getTweetText (tweetElement) {
  let element = tweetElement.getElementsByClassName('js-tweet-text-container')
  if (element) { return cleanTweet(element[0].innerText) } else { return false }
}

function getTweetsFromDocument (documentElement) {
  let element = documentElement.querySelectorAll('div.original-tweet')
  if (element) { return element } else { return false }
}
exports.getTweetsFromDocument = getTweetsFromDocument
exports.getTweetText = getTweetText

window.getTweetsFromDocument = getTweetsFromDocument
window.getTweetText = getTweetText

// document.getElementsByClassName('original-tweet')[1].getElementsByClassName('js-tweet-text-container')[0].innerText
